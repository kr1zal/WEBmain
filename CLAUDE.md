# CLAUDE.md — Системный файл проекта avinogradov.pro

## Обзор проекта

Персональный портфолио-сайт Александра Виноградова (IT Director, E-commerce Expert).
**URL:** https://avinogradov.pro
**Репозиторий:** https://github.com/kr1zal/WEBmain

## Стек технологий

- **Framework:** Next.js 15.2.4 (App Router) + React 19
- **Styling:** Tailwind CSS 4.0.5
- **Content:** Contentlayer2 0.5.5 (MDX → типизированные данные)
- **Animations:** Framer Motion 12.23.24
- **UI:** Headless UI 2.2.0
- **Theme:** next-themes 0.4.6
- **Font:** Space Grotesk (Google Fonts)
- **Analytics:** Umami
- **Comments:** Giscus (GitHub Discussions)
- **Search:** KBar (client-side)
- **Package Manager:** Yarn 3.6.1
- **Deploy:** Vercel

## Структура проекта

```
app/                  # Next.js App Router (страницы)
  Main.tsx            # Hero секция главной (клиентский компонент с анимациями)
  about/              # Страница "Обо мне"
  projects/           # Проекты (listing + [...slug] детали)
  blog/               # Блог (listing + [...slug] посты)
  tags/               # Теги
components/           # Переиспользуемые компоненты
layouts/              # Шаблоны страниц (ProjectLayout, AuthorLayout, ListLayoutWithTags)
data/                 # Контент и конфигурация
  siteMetadata.js     # Глобальная конфигурация сайта
  headerNavLinks.ts   # Навигация
  projects/*.mdx      # Контент проектов (4 шт)
  blog/*.mdx          # Блог-посты (1 шт — placeholder)
  authors/default.mdx # Био автора
css/                  # Стили (tailwind.css, prism.css)
public/static/        # Изображения, фавиконы, видео
scripts/              # Build-скрипты (RSS, postbuild)
```

## Команды

```bash
yarn dev          # Запуск dev-сервера
yarn build        # Сборка продакшн
yarn serve        # Запуск собранного билда
yarn lint         # ESLint
yarn analyze      # Анализ размера бандла
```

## Контент

Контент управляется через MDX + Contentlayer2:

- **Проекты:** `data/projects/*.mdx` (frontmatter: title, description, imgSrc, role, period, techStack, repo, gallery)
- **Блог:** `data/blog/*.mdx` (frontmatter: title, date, tags, draft, summary, authors)
- **Авторы:** `data/authors/*.mdx` (frontmatter: name, avatar, occupation, company, social links)

## Ветвление

- `main` — продакшн
- `dev` — разработка (текущая ветка)
- PR из `dev` → `main`

## Известные проблемы

- TypeScript strict mode отключен (`strict: false`, `ignoreBuildErrors: true`)
- ESLint отключен на билде (`ignoreDuringBuilds: true`)
- Динамические Tailwind-классы в SocialIcon (`h-${size}`) не работают
- body-scroll-lock — beta-версия в продакшне
- Пагинация блога не использует searchParams.page
- Локаль OpenGraph: `en_US` вместо `ru_RU`
- Нет error boundaries
- Нет тестов

## Неиспользуемый код (можно удалить)

- `components/LayoutWrapper.tsx`
- `layouts/ListLayout.tsx`, `layouts/PostLayout.tsx`, `layouts/PostSimple.tsx`, `layouts/PostBanner.tsx`
- `data/projectsData.ts`
- `data/authors/sparrowhawk.mdx`
- `faq/` директория

## Env-переменные

```
NEXT_UMAMI_ID=          # Umami analytics
NEXT_PUBLIC_GISCUS_*=   # Giscus comments (4 переменные)
BUTTONDOWN_API_KEY=     # Newsletter
BASE_PATH=              # Опционально, для subpath деплоя
```
