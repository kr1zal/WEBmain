import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Связаться с Александром Виноградовым: email, Telegram, LinkedIn, GitHub. Обсуждение проектов, позиций и консалтинговых задач по e-commerce, AI-автоматизации и цифровой трансформации.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
