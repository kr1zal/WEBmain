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
- **Font:** Prata (заголовки, `font-display`) + Golos Text (текст), Google Fonts через `next/font`, subsets `latin` + `cyrillic`
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

   Результат в `out/` (~18 MB, 18 страниц; замер 15.10.2026). Если запускать сборку через
   `| tail`, код выхода теряется: смотреть в логе `✓ Exporting`, а не exit code.

2. **`trailingSlash: true`** в `next.config.js` — обязательно. При `false` Next.js генерирует `about.html`/`projects.html`, а nginx на Beget не добавляет `.html` к URL без расширения → все подстраницы дают 404. При `true` структура `about/index.html` — nginx подаёт `index.html` из директории из коробки.

3. **`UNOPTIMIZED=1`** — `next/image` с оптимизацией на лету требует Node.js runtime. На shared-хостинге не работает, отдаются оригиналы.

### Deploy pipeline

Локально:

```bash
rm -rf out .next
EXPORT=1 UNOPTIMIZED=1 yarn build
rsync -avz --delete -e "ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new" \
  out/ kr1zalf2@kr1zalf2.beget.tech:~/avinogradov.pro/public_html/
git add . && git commit -m "..." && git push origin main
```

SSH-доступ по ключу `~/.ssh/id_ed25519`, пароль и `sshpass` не нужны (`ssh -o BatchMode=yes` проходит, проверено при деплое 15.10.2026). Сервер: `kr1zalf2.beget.tech`. Логин: `kr1zalf2`. Корень сайта: `~/avinogradov.pro/public_html/`.

Полную сборку с `--delete` деплоить только из чистого рабочего дерева (`git status` пуст): чужие незакоммиченные правки иначе уедут на прод. Точечная правка одного файла — `rsync` без `--delete`.

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
  blog/                   # /blog + /blog/[slug]. Опубликованных постов нет, hello-world.mdx
                          # оставлен как draft: совсем без файлов в data/blog пустой
                          # generateStaticParams в /blog/[...slug] ломает static export.
                          # app/tags удалён 15.10.2026 по той же причине (/tags/[tag] при
                          # нуле тегов); при запуске блога: git checkout 3c675d1 -- app/tags
  contact/
    page.tsx              # 'use client' с формой
    layout.tsx            # server-layout c metadata (title/description для /contact)

components/
  SchemaPersonLd.tsx      # Server component с JSON-LD Schema.org Person разметкой.
                          # Используется в layout.tsx для Google Knowledge Panel.
  SchemaBreadcrumbLd.tsx  # Server component с JSON-LD BreadcrumbList (Главная → Проекты → кейс),
                          # подключён в app/projects/[...slug]/page.tsx. Адреса со слешем, как canonical.
  RevioDiagram.tsx        # Схема RevioMP (источники → ядро → кабинет) по образцу BixirunDiagram.
  case/                   # Страница проекта RevioMP: RevioHero.tsx (hero-сцены продукта),
                          # Screens.tsx (сетка кадров, пара «десктоп / телефон», кадр на всю
                          # ширину), hero/* (копия сцены с reviomp.ru). См. раздел ниже.
  MetricsStrip.tsx        # (вне основного дизайна, сейчас не используется)
  ... прочие: Image, Link, Header, Footer, Motion, ThemeSwitch, Pre, SocialIcon, ...

public/
  yandex-metrika.js       # Вынесенный инициализатор Я.Метрики (был inline, теперь
                          # внешний чтобы layout.tsx был чистым).
  .htaccess               # ErrorDocument 404 /404.html (брендированный 404).
  static/favicons/        # Фавиконки (16, 32, 120, apple-touch, safari, manifest).
                          # 120×120 специально для Яндекс.Вебмастера.
  static/images/          # Аватар, og-картинка, фото проектов.
  static/images/reviomp/  # Кадры демо-кабинета reviomp.ru для страницы проекта (cab-*, land-*)
                          # и hero/* — снимки hero-сцены.
  static/images/covers/   # Обложки кейсов 1200×630 (сейчас reviomp-analytics), делает
                          # tools/covers/gen-scenes.py.

data/
  siteMetadata.js         # Глобальная конфигурация (title, description, URL, social).
  headerNavLinks.ts       # Навигация в шапке.
  projects/*.mdx          # 5 кейсов: imperial-furniture, reviomp-analytics,
                          # bixirun-app, medtech-clinic, political-campaigns.
  blog/hello-world.mdx    # Placeholder-пост из boilerplate, draft: true (вне /blog, sitemap, feed).
  authors/default.mdx     # Био автора.

css/                      # tailwind.css, prism.css
scripts/                  # postbuild.mjs (pliny sitemap), rss.mjs
tools/covers/             # gen-scenes.py: картинки кейсов через OpenRouter в стилистике обложек
                          # BIXIRUN и Империала (ДНК стиля и промпты в шапке файла), --cover
                          # сохраняет сцену как обложку 1200×630. tools/covers/out/ в .gitignore.
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
- **Шрифты с кириллицей обязательны.** Space Grotesk и DM Serif кириллицы не имели, весь русский текст шёл системным fallback (заменены 15.10.2026). Новый шрифт брать только с `cyrillic` в `subsets`. Prata шире DM Serif примерно на 10%, поэтому в `css/tailwind.css` у `.font-display, h1, h2, h3` стоят `font-size-adjust: 0.48` (x-height прежнего шрифта) и `text-wrap: balance`. Без них заголовки перестраиваются. У Prata одно начертание (400, без курсива): `font-bold` и `italic` браузер рисует сам.
- **`matchMedia('(max-width: 767px)')`** для разделения mobile/desktop JS-логики (соответствует Tailwind `md:` breakpoint 768px).
- **Серверный HTML ничего не прячет.** `Reveal`, `ImageReveal`, `StaggerContainer`/`StaggerItem` (`components/Motion.tsx`) рендерятся видимыми; прячет клиент в layout-эффекте: при гидрации только элементы ниже окна, после перехода по ссылке все, проявление — WAAPI при входе в окно. Hero главной проявляется CSS-анимацией (`.hero-fade`/`.hero-photo` в `css/tailwind.css`), не ждёт JS. Не возвращать `initial={{ opacity: 0 }}` у framer-motion на контенте: без JS и до гидрации страница пустая. Проверка: `grep -c 'opacity:0' out/index.html` = 0.
- **`app/template.tsx`** при первом монтировании (гидрации) не анимирует (`initial={false}`, флаг на уровне модуля), анимация перехода только при переходах по ссылкам.

## Мобильный аккордеон «Опыт»

`app/Main.tsx`, блок `{/* ── Mobile: Vertical Timeline ── */}`:

- При клике на карточку — `scrollIntoView({ block: 'center', behavior: 'smooth' })` через `useLayoutEffect` после React layout commit. Открытая всегда приезжает в центр viewport. Реализовано через `pendingCenter` ref, без rAF/setTimeout.
- Анимация раскрытия — **только opacity fade** (200ms). Height меняется мгновенно — это обязательно, иначе scroll замеряет старую высоту.
- Все dots на timeline — `h-3 w-3` (12×12). Любое другое значение ломает выравнивание с линией `left-[5px] w-[1.5px]` (центр 5.75px vs центр точки 6px = разница 0.25px, невидимо).
- Hero-карточка активна условно, как все остальные. При `openPosition === 'hero'` — синий border-left + синяя точка с halo. Иначе — transparent border + серая точка с gray halo (сохраняет ранг якоря).
- `aria-expanded` и `focus-visible:ring` на всех кнопках.

## Контент (MDX + Contentlayer2)

- **Проекты:** `data/projects/*.mdx` — frontmatter: `title, description, imgSrc, role, period, techStack, repo, gallery`, `lastmod` (дата последней правки, идёт в `lastModified` sitemap), необязательное `hero` (`'reviomp'` = вместо картинки `imgSrc` над текстом рендерится `<RevioHero />`; `imgSrc` остаётся для карточек и OG), необязательное `imgPosition` (CSS object-position картинки в карточке /projects, карточка кропает до 16:10; у МедТех `'top'`, чтобы фигура не резалась). Вычисляемое `imgSize` — реальные размеры `imgSrc` через `image-size`: шапка кейса резервирует место ровно под картинку, поэтому квадратные и портретные обложки не сдвигают вёрстку при загрузке.
- **Блог:** `data/blog/*.mdx` — `title, date, tags, draft, summary, authors`.
- **Авторы:** `data/authors/*.mdx` — `name, avatar, occupation, company, social links`.

Contentlayer генерирует типизированные данные в `.contentlayer/` при `yarn dev` / `yarn build`.

## Страница проекта RevioMP (`/projects/reviomp-analytics`)

Переделана 15.10.2026 (owner: менять только наполнение страницы, шрифты и всё сайтовое не трогать).

- **Текст** — `data/projects/reviomp-analytics.mdx`, манера и порядок разделов как у `bixirun-app.mdx`: «Как появился проект / Что внутри / Архитектура / Скриншоты / Решения / Технологический стек / Что под капотом / Статус». Числа «Что под капотом» — срез кода RevioMP на 10.10.2026 (дата названа в тексте). Без тире «—» в прозе, без упоминаний нейросетей, без планов. Тысячи, «тыс.» и даты — через `&nbsp;`.
- **Hero в шапке** — `components/case/RevioHero.tsx` + `components/case/hero/*`: копия hero-сцены главной reviomp.ru (репозиторий `Projects/Analitics`, `frontend/src/pages/landing/components/hero/`, снимки `frontend/src/assets/hero/*.webp`). Отличия копии от продукта: нет подложки, заголовка, кнопок и переключателя вкладок под экраном; окно телефона — полный экран 390 × 844 (в продукте 390 × 593), пределы прокрутки слоёв пересчитаны под него (`heroScenes.ts`, `CONTENT_H`/`SCROLL_*`); от 768 px десктопная и телефонная сцены стоят рядом одной высоты (`revio-hero.css`, колонки `1.0213fr 0.4621fr`), уже 768 px — только телефон; снимки телефона грузятся на любой ширине. Пауза вне окна, при reduced motion — первый кадр. Если сцена продукта меняется — переносить файлы заново и повторять эти отличия.
- **Скриншоты** — `components/case/Screens.tsx`: `items` (сетка 2 колонки, кадры одной высоты), `pair` (широкий кадр + телефон одной высоты), `wide` (кадр на всю ширину). Каждый кадр на странице один раз. Кадры сняты с демо-кабинета reviomp.ru 09–10.10.2026 (1440 и 390 px), лежат в `public/static/images/reviomp/`; при пересъёмке сохранять размеры из `width/height` в MDX.
- **Схема** — `components/RevioDiagram.tsx`, зарегистрирована в `components/MDXComponents.tsx` вместе со `Screens`.
- **Шаблон** — в `layouts/ProjectLayout.tsx` при `hero === 'reviomp'` вместо `<Image imgSrc>` над текстом `<RevioHero />` отдельной строкой сетки: на lg (1024–1279) во всю ширину статьи, сайдбар ниже, справа от текста; от xl над текстом, сайдбар справа на обе строки. Поле `hero` объявлено в `contentlayer.config.ts`. Порядок в DOM у всех кейсов: (hero) → контент → сайдбар, на телефоне сайдбар после текста.
- **Проверка** — `rm -rf out .next && EXPORT=1 UNOPTIMIZED=1 yarn build`, затем страница на 390 / 768 / 1024 / 1280 / 1440: обе лупы движутся, кадры сцены загружены (10 десктоп + 13 телефон), горизонтального скролла нет, вне окна сцена на паузе.

## Env-переменные (.env.example)

```
NEXT_UMAMI_ID=          # Umami analytics (сейчас не активен)
NEXT_PUBLIC_GISCUS_*=   # Giscus comments (4 переменные). Не используются: блок comments убран из
                        # siteMetadata 15.10.2026, с ним ушла плавающая кнопка «к комментариям»
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
ssh -o BatchMode=yes kr1zalf2@kr1zalf2.beget.tech
```

## Не трогать (legacy/unused)

- `layouts/ListLayout.tsx`, `layouts/PostLayout.tsx`, `layouts/PostSimple.tsx`, `layouts/PostBanner.tsx` — старые шаблоны из начального boilerplate.
- `components/LayoutWrapper.tsx` — заменён на SectionContainer.
- `data/projectsData.ts` — заменён на MDX.
- `data/authors/sparrowhawk.mdx` — пример автора из boilerplate.
- `faq/` директория — не используется.
- `content/*.md` / `content/*.html` — черновики и резюме, в `.gitignore` не включены, но не попадают в билд.
