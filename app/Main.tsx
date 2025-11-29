import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-6 pb-8 space-y-8 md:space-y-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-800">
             <Image
              src="/static/images/avatar.png"
              alt="Aleksandr Vinogradov"
              width={256}
              height={256}
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14 text-center">
            Aleksandr Vinogradov
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 text-center max-w-2xl">
            IT Director | E-commerce Expert | Digital Transformation
          </p>
           <p className="text-base leading-7 text-gray-500 dark:text-gray-400 text-center max-w-2xl">
            Scaled e-commerce revenue 87x (from 300K to 26M ₽/mo). Built IT departments from scratch.
            Automation enthusiast (n8n, AI).
          </p>
        </div>

        <div className="flex space-x-4">
          <Link
            href="/projects"
            className="px-6 py-3 text-base font-medium leading-6 text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 rounded-lg transition duration-150 ease-in-out"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 text-base font-medium leading-6 text-primary-500 bg-transparent border border-primary-500 hover:bg-primary-50 focus:ring-4 focus:ring-primary-300 rounded-lg transition duration-150 ease-in-out dark:hover:bg-gray-800"
          >
            About Me
          </Link>
        </div>

        <div className="w-full max-w-4xl pt-10">
          <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 mb-6 text-center">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Management</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Teams up to 60 people. P&L Responsibility. Agile/Scrum. Crisis Management.
                </p>
             </div>
             <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold mb-2">E-commerce</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Unit Economics. ROI up to 420%. Marketplaces (WB, Ozon, Yandex). PPC & SEO.
                </p>
             </div>
             <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Tech & AI</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                   n8n Automation. React Native (Expo). SQL/PostgreSQL. 1C Integration. AI Agents.
                </p>
             </div>
          </div>
        </div>
      </div>
    </>
  )
}
