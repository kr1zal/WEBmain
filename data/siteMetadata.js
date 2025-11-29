/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Александр Виноградов - IT Директор & Эксперт E-commerce',
  author: 'Александр Виноградов',
  headerTitle: 'Vinogradov',
  description: 'Личный сайт Александра Виноградова. IT Директор, Эксперт в E-commerce, Цифровая трансформация.',
  language: 'ru-RU',
  theme: 'system', // system, dark or light
  siteUrl: 'https://web-bmain.vercel.app',
  siteRepo: 'https://github.com/kr1zal/WEBmain',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'npspw@mail.ru',
  github: 'https://github.com/kr1zal',
  telegram: 'https://t.me/alv1nogradov',
  linkedin: 'https://www.linkedin.com',
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
