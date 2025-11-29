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
  const { title, imgSrc } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <header className="pt-6 pb-6">
            <div className="space-y-1 text-center">
              <PageTitle>{title}</PageTitle>
            </div>
          </header>
          
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700">
            {imgSrc && (
                <div className="w-full flex justify-center mb-8 pt-8">
                        <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                            <Image
                            src={imgSrc}
                            alt={title}
                            width={1200}
                            height={630}
                            className="object-cover w-full h-auto"
                            />
                        </div>
                </div>
            )}
            <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
                {children}
            </div>
            
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base pt-4 xl:pt-8">
                {prev && prev.path && (
                  <div className="pt-4 sm:pt-0">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Предыдущий проект: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 sm:pt-0">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Следующий проект: ${next.title}`}
                    >
                      {next.title} &rarr;
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
