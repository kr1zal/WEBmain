import { allProjects } from 'contentlayer/generated'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { Reveal } from '@/components/Motion'

export const metadata = genPageMetadata({
  title: 'Проекты',
  description:
    'Ключевые проекты Александра Виноградова в области цифровой трансформации, e-commerce и технологий.',
})

export default function Projects() {
  return (
    <div className="pt-24 sm:pt-28">
      <Reveal>
        <div className="mb-12 flex items-baseline justify-between border-b-[3px] border-gray-900 pb-3 dark:border-gray-100">
          <h1 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
            Проекты
          </h1>
          <span className="text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Избранные реализации
          </span>
        </div>
      </Reveal>
      <div className="pt-6 pb-8 sm:pt-8 sm:pb-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {allProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <Card
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={`/projects/${project.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
