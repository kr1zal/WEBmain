import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Project } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Project>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function ProjectLayout({ content, next, prev, children }: LayoutProps) {
  const { title, description, imgSrc, role, period, techStack } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          {/* Header Section (Title only) */}
          <header className="pt-6 pb-4">
            <div className="text-left">
              <PageTitle>{title}</PageTitle>
            </div>
          </header>

          <div className="pb-8">
            {/* Main Content Area */}
            <div className="pt-6 pb-8">
              {/* Grid Layout */}
              <div className="grid grid-cols-1 gap-10 xl:grid-cols-4 xl:gap-x-12">
                {/* Main Content Column (Left) */}
                <div className="xl:col-span-3">
                  {/* Hero Image inside the content column */}
                  {imgSrc && (
                    <div className="mb-10 w-full">
                      <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow-xl dark:border-gray-800">
                        <Image
                          src={imgSrc}
                          alt={title}
                          width={1200}
                          height={630}
                          className="h-auto w-full object-cover"
                          priority
                        />
                      </div>
                    </div>
                  )}

                  {/* Prose Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {children}

                    {content.gallery && content.gallery.length > 0 && (
                      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Галерея
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {content.gallery.map((img, index) => (
                            <div
                              key={index}
                              className="relative overflow-hidden rounded-lg border border-gray-200 shadow-lg transition-opacity hover:opacity-90 dark:border-gray-800"
                            >
                              <Image
                                src={img}
                                alt={`${title} gallery image ${index + 1}`}
                                width={800}
                                height={600}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar / Metadata (Right) */}
                <div className="xl:col-span-1">
                  <div className="sticky top-6 flex flex-col gap-6 rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/40">
                    {role && (
                      <div>
                        <h3 className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                          Роль
                        </h3>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {role}
                        </div>
                      </div>
                    )}

                    {period && (
                      <div>
                        <h3 className="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                          Период
                        </h3>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {period}
                        </div>
                      </div>
                    )}

                    {techStack && techStack.length > 0 && (
                      <div>
                        <h3 className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                          Технологии
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-primary-600 bg-primary-50 border-primary-100 dark:bg-primary-900/10 dark:text-primary-300 dark:border-primary-800/50 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <footer>
              <div className="flex flex-col pt-8 text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && prev.path && (
                  <div className="pt-4 sm:pt-0">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 group flex items-center"
                      aria-label={`Предыдущий проект: ${prev.title}`}
                    >
                      <span className="mr-2 transition-transform group-hover:-translate-x-1">
                        &larr;
                      </span>{' '}
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 sm:pt-0">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 group flex items-center"
                      aria-label={`Следующий проект: ${next.title}`}
                    >
                      {next.title}{' '}
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
