import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-12 px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section: Split Layout on Desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Left Column: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-2xl border-4 border-gray-200 dark:border-gray-800 shadow-2xl">
              <Image
                src="/static/images/avatar.png"
                alt="Александр Виноградов"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Right Column: Text & Actions */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                Александр Виноградов
              </h1>
              <p className="mt-4 text-xl font-medium text-primary-600 dark:text-primary-400">
                IT Директор | Эксперт E-commerce | Цифровая Трансформация
              </p>
            </div>
            
            <p className="text-lg leading-7 text-gray-600 dark:text-gray-300 max-w-lg">
              Масштабирую бизнес через технологии и данные. <br className="hidden md:block" />
              Рост выручки с 300K до 26M ₽/мес. <br className="hidden md:block" />
              Строю команды, автоматизирую процессы, даю результат.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/projects"
                className="px-8 py-3 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Смотреть проекты
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 text-base font-semibold text-primary-600 bg-white border-2 border-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg dark:bg-transparent dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-800 text-center"
              >
                Обо мне
              </Link>
            </div>
          </div>
        </div>

        {/* Competencies Section */}
        <div className="w-full pt-16">
          <h2 className="text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 mb-10 text-center md:text-left">
            Ключевые компетенции
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Управление</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Команды до 60 человек</li>
                  <li>• P&L Ответственность</li>
                  <li>• Agile/Scrum Процессы</li>
                  <li>• Кризис-менеджмент</li>
                </ul>
             </div>
             <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">E-commerce</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Unit-экономика и ROI</li>
                  <li>• Маркетплейсы (WB, Ozon)</li>
                  <li>• Рост выручки в 87 раз</li>
                  <li>• Омниканальная стратегия</li>
                </ul>
             </div>
             <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Tech & AI</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Автоматизация (n8n, Make)</li>
                  <li>• React Native (Expo)</li>
                  <li>• SQL / PostgreSQL</li>
                  <li>• Внедрение AI агентов</li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </>
  )
}
