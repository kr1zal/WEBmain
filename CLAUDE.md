# CLAUDE.md — Системный файл проекта avinogradov.pro

## Обзор

Персональный портфолио-сайт Александра Виноградова (IT Director, E-commerce Expert).

- **Продакшн:** https://avinogradov.pro
- **Репозиторий:** https://github.com/kr1zal/WEBmain
- **Ветка деплоя:** `main` (работаем прямо в ней, ветки `dev` нет)

## Стек

- **Framework:** Next.js 15.5.12 (App Router) + React 19
- **Styling:** Tailwind CSS 4.0.5
- **Content:** Contentlayer2 0.5.5 (MDX → типизированные данные)
- **Animations:** Framer Motion 12.23.24
- **UI:** Headless UI 2.2.0
- **Theme:** next-themes 0.4.6
- **Font:** Space Grotesk + DM Serif Display (Google Fonts)
- **Analytics:** Яндекс.Метрика (счётчик `108207327`, с Webvisor)
- **Search:** KBar (client-side)
- **Package Manager:** Yarn 3.6.1 (через corepack)

## Хостинг и деплой — САМОЕ ВАЖНОЕ

**Сайт на Beget shared-хостинг (тариф Blog).** Не Vercel и не Node.js-сервер. LAMP-стек: Apache + Nginx фронт, PHP 5.6 (не используем).

**Из этого следуют критичные ограничения:**

1. **Сайт работает только как статика.** SSR Next.js тут запустить нельзя (Node.js на shared-тарифе нет). Собираем статический экспорт:

   ```bash
   rm -rf out .next
   EXPORT=1 UNOPTIMIZED=1 yarn build
   ```

   Результат в `out/` (~38-42 MB).

2. **`trailingSlash: true`** в `next.config.js` — обязательно. При `false` Next.js генерирует `about.html`/`projects.html`, а nginx на Beget не добавляет `.html` к URL без расширения → все подстраницы дают 404. При `true` структура `about/index.html` — nginx подаёт `index.html` из директории из коробки.

3. **`UNOPTIMIZED=1`** — `next/image` с оптимизацией на лету требует Node.js runtime. На shared-хостинге не работает, отдаются оригиналы.

### Deploy pipeline

Локально:

```bash
rm -rf out .next
EXPORT=1 UNOPTIMIZED=1 yarn build
sshpass -e rsync -avz --delete -e "ssh -o StrictHostKeyChecking=accept-new" \
  out/ kr1zalf2@kr1zalf2.beget.tech:~/avinogradov.pro/public_html/
git add . && git commit -m "..." && git push origin main
```

SSH-доступ настроен паролем (не ключом). Сервер: `kr1zalf2.beget.tech`. Логин: `kr1zalf2`. Корень сайта: `~/avinogradov.pro/public_html/`.

### DNS / SSL / Домен

- Домен `avinogradov.pro` зарегистрирован у Directi, NS указывают на Beget (`ns1/ns2.beget.com`).
- A-запись `avinogradov.pro` и `www.avinogradov.pro` → `87.236.16.177` (Beget SSL-фронт). **Не** `kr1zalf2.beget.tech` IP `5.101.152.21` — тот используется только для SSH/rsync, не для входящих HTTPS.
- SSL Let's Encrypt выпускается через панель Beget: «Домены → avinogradov.pro → Управление SSL → LetsEncrypt → Стандартный сертификат». Автообновление встроенное.
- При любых проблемах с доступностью — первым делом `dig avinogradov.pro A` и проверка что отвечает `87.236.16.177`.

## Команды

```bash
yarn dev                                    # Dev-сервер на localhost:3000 (и 192.168.1.102:3000 в LAN)
EXPORT=1 UNOPTIMIZED=1 yarn build           # Продакшн-сборка статики в out/
yarn lint                                   # ESLint
yarn analyze                                # Анализ размера бандла
```

`yarn` берётся через corepack (`corepack prepare yarn@3.6.1 --activate`).

## Структура проекта

```
app/
  Main.tsx                # ГЛАВНАЯ страница (клиентский компонент, 700+ строк).
                          # Содержит все блоки: Hero, Impact Numbers, Опыт (timeline),
                          # Projects, Competencies, Speaking, Contact. Все данные
                          # хардкодом сверху файла в константах.
  layout.tsx              # Root layout. В <body> подключены SchemaPersonLd,
                          # Яндекс.Метрика через <Script src="/yandex-metrika.js" />,
                          # <noscript> pixel. Никакого inline-dangerously-HTML.
  page.tsx                # Root route — рендерит <Main />
  about/                  # Страница /about (server, MDX-контент)
  projects/               # /projects + /projects/[slug] (детали кейсов)
  blog/                   # /blog + /blog/[slug]
  tags/                   # /tags + /tags/[tag]
  contact/
    page.tsx              # 'use client' с формой
    layout.tsx            # server-layout c metadata (title/description для /contact)

components/
  SchemaPersonLd.tsx      # Server component с JSON-LD Schema.org Person разметкой.
                          # Используется в layout.tsx для Google Knowledge Panel.
  MetricsStrip.tsx        # (вне основного дизайна, сейчас не используется)
  ... прочие: Image, Link, Header, Footer, Motion, ThemeSwitch, Pre, SocialIcon, ...

public/
  yandex-metrika.js       # Вынесенный инициализатор Я.Метрики (был inline, теперь
                          # внешний чтобы layout.tsx был чистым).
  .htaccess               # ErrorDocument 404 /404.html (брендированный 404).
  static/favicons/        # Фавиконки (16, 32, 120, apple-touch, safari, manifest).
                          # 120×120 специально для Яндекс.Вебмастера.
  static/images/          # Аватар, твиттер-карта, фото проектов.

data/
  siteMetadata.js         # Глобальная конфигурация (title, description, URL, social).
  headerNavLinks.ts       # Навигация в шапке.
  projects/*.mdx          # 5 кейсов: imperial-furniture, reviomp-analytics,
                          # bixirun-app, medtech-clinic, political-campaigns.
  blog/hello-world.mdx    # Placeholder-пост.
  authors/default.mdx     # Био автора.

css/                      # tailwind.css, prism.css
scripts/                  # postbuild.mjs (pliny sitemap), rss.mjs
next.config.js            # CSP, trailingSlash, images config, webpack svgr
```

## Где лежат данные персонажа (для шаблонирования под других людей)

Если этот проект форкается под чужой портфолио — менять нужно:

| Что                                                                    | Где                                                                                                |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Имя, URL, мета-описание                                                | `data/siteMetadata.js`                                                                             |
| Вся главная страница (hero-текст, метрики, опыт, проекты, компетенции) | `app/Main.tsx` — константы в верхних ~200 строках                                                  |
| Schema.org Person JSON-LD                                              | `components/SchemaPersonLd.tsx`                                                                    |
| Верификация Я.Вебмастер / Google Search Console                        | `app/layout.tsx` — теги `meta name="yandex-verification"` и `meta name="google-site-verification"` |
| Счётчик Яндекс.Метрики                                                 | `public/yandex-metrika.js` — ID `108207327`                                                        |
| Аватар, фото проектов                                                  | `public/static/images/`                                                                            |
| Favicons                                                               | `public/static/favicons/`                                                                          |
| Контент кейсов                                                         | `data/projects/*.mdx`                                                                              |
| Страница «Обо мне»                                                     | `app/about/page.tsx` + её контент (в том же файле)                                                 |

Остальной код — шаблон, трогать не нужно.

## Критичные архитектурные решения (не ломать)

- **Scripts в `<body>`, не в `<html>`.** React 19 ругается hydration error если `<script>` или `<noscript>` — прямые потомки `<html>`. Размещаются внутри `<body>` перед `<ThemeProviders>`.
- **Никакого inline-HTML-инъектирования в layout.tsx.** Яндекс.Метрика подключается через `<Script src="/yandex-metrika.js" />`, Schema.org — через отдельный компонент `SchemaPersonLd`. Если понадобится добавить inline-скрипт — создавать отдельный серверный компонент.
- **CSP в `next.config.js`** разрешает `script-src` для `*.yandex.ru`, `giscus.app`, `analytics.umami.is`. При добавлении новых внешних скриптов — сразу добавлять в CSP.
- **`matchMedia('(max-width: 767px)')`** для разделения mobile/desktop JS-логики (соответствует Tailwind `md:` breakpoint 768px).

## Мобильный аккордеон «Опыт»

`app/Main.tsx`, блок `{/* ── Mobile: Vertical Timeline ── */}`:

- При клике на карточку — `scrollIntoView({ block: 'center', behavior: 'smooth' })` через `useLayoutEffect` после React layout commit. Открытая всегда приезжает в центр viewport. Реализовано через `pendingCenter` ref, без rAF/setTimeout.
- Анимация раскрытия — **только opacity fade** (200ms). Height меняется мгновенно — это обязательно, иначе scroll замеряет старую высоту.
- Все dots на timeline — `h-3 w-3` (12×12). Любое другое значение ломает выравнивание с линией `left-[5px] w-[1.5px]` (центр 5.75px vs центр точки 6px = разница 0.25px, невидимо).
- Hero-карточка активна условно, как все остальные. При `openPosition === 'hero'` — синий border-left + синяя точка с halo. Иначе — transparent border + серая точка с gray halo (сохраняет ранг якоря).
- `aria-expanded` и `focus-visible:ring` на всех кнопках.

## Контент (MDX + Contentlayer2)

- **Проекты:** `data/projects/*.mdx` — frontmatter: `title, description, imgSrc, role, period, techStack, repo, gallery`.
- **Блог:** `data/blog/*.mdx` — `title, date, tags, draft, summary, authors`.
- **Авторы:** `data/authors/*.mdx` — `name, avatar, occupation, company, social links`.

Contentlayer генерирует типизированные данные в `.contentlayer/` при `yarn dev` / `yarn build`.

## Env-переменные (.env.example)

```
NEXT_UMAMI_ID=          # Umami analytics (сейчас не активен)
NEXT_PUBLIC_GISCUS_*=   # Giscus comments (4 переменные, блог пока не используется)
BUTTONDOWN_API_KEY=     # Newsletter (не используется)
BASE_PATH=              # Опциональный subpath деплой
EXPORT=1                # Включает static export в next.config.js
UNOPTIMIZED=1           # Отключает next/image оптимизацию (требует Node.js)
```

## Панель Beget — полезные операции

- **Хостинг → Сайты** — создание нового сайта (папка `~/<name>/public_html/`).
- **Домены → [домен] → Прикрепить** — привязка домена к сайту.
- **DNS → [домен]** — управление A/CNAME/MX/TXT.
- **Хостинг → Сайты → [сайт] → ⋮ → Прикрепить домен** — добавление алиаса (например `www`).
- **Домены → [домен] → ⋮ → Управление SSL** — Let's Encrypt.
- **Настройки → Безопасность → Beget API** — генерация API-пароля (нужен для программного доступа, обычный CP-пароль не подходит).

## Известные ограничения

- TypeScript strict mode отключен (`strict: false`, `ignoreBuildErrors: true` в `next.config.js`).
- ESLint `ignoreDuringBuilds: true` — билд проходит даже с ошибками. Но `yarn lint` и pre-commit husky — работают.
- Нет тестов.
- Нет error boundaries.
- `<noscript>` pixel Яндекс.Метрики использует `<img>` (next/image в noscript не работает) — отмечен `eslint-disable-next-line @next/next/no-img-element`.

## Полезные команды при отладке

```bash
# Проверить DNS (обходя возможный ISP-кэш)
curl -s 'https://dns.google/resolve?name=avinogradov.pro&type=A' | python3 -m json.tool

# Проверить сертификат (subject/issuer/dates)
echo | openssl s_client -connect avinogradov.pro:443 -servername avinogradov.pro 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName

# SSH на Beget
SSHPASS='<пароль>' sshpass -e ssh kr1zalf2@kr1zalf2.beget.tech
```

## Не трогать (legacy/unused)

- `layouts/ListLayout.tsx`, `layouts/PostLayout.tsx`, `layouts/PostSimple.tsx`, `layouts/PostBanner.tsx` — старые шаблоны из начального boilerplate.
- `components/LayoutWrapper.tsx` — заменён на SectionContainer.
- `data/projectsData.ts` — заменён на MDX.
- `data/authors/sparrowhawk.mdx` — пример автора из boilerplate.
- `faq/` директория — не используется.
- `content/*.md` / `content/*.html` — черновики и резюме, в `.gitignore` не включены, но не попадают в билд.
