import AboutLayout from '@/layouts/AboutLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Обо мне',
  description:
    'Александр Виноградов — IT Директор и Head of E-commerce с 13+ летним опытом. Рост выручки в 87 раз, команды до 60 человек, 5 политических побед из 5.',
})

export default function Page() {
  return <AboutLayout />
}
