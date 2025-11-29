import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-12 px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section: Split Layout on Desktop */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 lg:gap-16">
          {/* Left Column: Image - Full Width in Column */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-2xl border-gray-200 dark:border-gray-800">
              <Image
                src="/static/images/avatar.png"
                alt="Aleksandr Vinogradov"
                width={1200}
                height={1200}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Right Column: Text & Actions */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6 text-center md:text-left pt-2">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                Aleksandr Vinogradov
              </h1>
              <p className="mt-4 text-2xl font-bold text-primary-600 dark:text-primary-400">
                IT Director | E-commerce Expert <br className="hidden lg:block" /> Digital Transformation
              </p>
            </div>
            
            <div className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 space-y-4">
              <p>
                I scale businesses through technology, automation, and data-driven management. 
                With over 11 years of experience, I specialize in building departments from scratch and transforming traditional business models into digital ecosystems.
              </p>
              
              <div className="text-left bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Results:</p>
                <ul className="space-y-2 list-disc list-inside text-base">
                  <li>
                    <span className="font-medium text-primary-600 dark:text-primary-400">87x Revenue Growth:</span> Scaled e-commerce from 300K to 26M ₽/mo.
                  </li>
                  <li>
                    <span className="font-medium text-primary-600 dark:text-primary-400">Team Leadership:</span> Managed up to 60 specialists across 8 departments.
                  </li>
                  <li>
                    <span className="font-medium text-primary-600 dark:text-primary-400">Automation:</span> Automated 70% of processes using n8n, Make, and AI.
                  </li>
                  <li>
                    <span className="font-medium text-primary-600 dark:text-primary-400">Efficiency:</span> Achieved 19-20% operating margin with full P&L responsibility.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/projects"
                className="px-8 py-4 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-center flex-1 sm:flex-none"
              >
                View Projects
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 text-lg font-semibold text-primary-600 bg-white border-2 border-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg dark:bg-transparent dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-800 text-center flex-1 sm:flex-none"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>

        {/* Competencies Section */}
        <div className="w-full pt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 mb-10 text-center md:text-left">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Management</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Strategic Planning & P&L</li>
                  <li>• Team Building (up to 60 ppl)</li>
                  <li>• Agile/Scrum/HADI Cycles</li>
                  <li>• Crisis Management</li>
                </ul>
             </div>
             <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">E-commerce</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Omni-channel Strategy</li>
                  <li>• Marketplaces (WB, Ozon)</li>
                  <li>• Unit Economics & Analytics</li>
                  <li>• Digital Marketing (PPC, SEO)</li>
                </ul>
             </div>
             <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Tech & AI</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• No-Code (n8n, Make)</li>
                  <li>• React Native (Expo)</li>
                  <li>• AI Agents & LLMs</li>
                  <li>• Full-stack Architecture</li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </>
  )
}
