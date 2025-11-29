interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Imperial (Furniture Factory)',
    description: `E-commerce Director. Scaled revenue from 300K to 26M ₽/mo (87x growth). Built 8 departments from scratch. Automated 70% of business processes using n8n, AI, and 1C integrations.`,
    imgSrc: '/static/images/google.png', // Нужно будет заменить на лого/скрин
    href: '#',
  },
  {
    title: 'Private Clinic (MedTech)',
    description: `E-commerce Director. Launched online direction from scratch. Increased patient LTV by 9x (up to 32K ₽/year). Built omni-channel ecosystem with amoCRM and IP-telephony integrations.`,
    imgSrc: '/static/images/time-machine.jpg', // Заглушка
    href: '#',
  },
  {
    title: 'Political Campaigns (Digital)',
    description: `Digital Campaign Director for 4 campaigns. Created "content factories" and automated distribution. Exceeded KPI by 25-37%. Developed SERM and crisis communication strategies.`,
    imgSrc: '/static/images/twitter-card.png', // Заглушка
    href: '#',
  },
  {
    title: 'BIXIRUN (Mobile App)',
    description: `Founder & Developer. Mobile app built with React Native (Expo) and Supabase. Available in TestFlight. Full-stack development from architecture to UI/UX.`,
    imgSrc: '/static/images/ocean.jpeg', // Заглушка
    href: '#',
  },
]

export default projectsData
