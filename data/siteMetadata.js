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
  // comments (giscus) убраны 15.10.2026: блог скрыт, а поле включало плавающую кнопку
  // «к комментариям» (components/ScrollTopAndComment.tsx) на страницах кейсов без якоря #comment
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
