/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Александр Виноградов — Head of E-commerce, IT Director, Chief AI Officer',
  author: 'Александр Виноградов',
  headerTitle: 'Vinogradov',
  description:
    'Александр Виноградов — Head of E-commerce и IT Director с 13+ летним опытом. Цифровая трансформация, рост выручки в 87 раз, команды до 60 человек, AI-автоматизация.',
  language: 'ru-RU',
  theme: 'light', // system, dark or light
  siteUrl: 'https://avinogradov.pro',
  siteRepo: 'https://github.com/kr1zal/WEBmain',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/og-image.png?v=2`,
  stickyNav: true,
  email: 'kr1zal@yandex.ru',
  github: 'https://github.com/kr1zal',
  telegram: 'https://t.me/alv1nogradov',
  linkedin: 'https://www.linkedin.com/in/александр-виноградов-02a2441a0',
  locale: 'ru-RU',
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'ru',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
