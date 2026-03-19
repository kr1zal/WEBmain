'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Project } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { Reveal, ImageReveal } from '@/components/Motion'

interface LayoutProps {
  content: CoreContent<Project>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function ProjectLayout({ content, next, prev, children }: LayoutProps) {
  const { title, description, imgSrc, role, period, techStack } = content

  return (
    <>
      <ScrollTopAndComment />
      <article className="pt-24 sm:pt-28">
        {/* Editorial header */}
        <header className="mb-10">
          <Reveal>
            <div className="flex items-baseline justify-between border-b-[3px] border-gray-900 pb-3 dark:border-gray-100">
              <h1 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
                {title}
              </h1>
            </div>
          </Reveal>
          {description && (
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </Reveal>
          )}
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-x-12">
          {/* Sidebar — first in DOM for mobile, reordered via CSS on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <Reveal>
              <div className="sticky top-20 flex flex-col gap-6 border border-gray-200 bg-white/80 p-6 dark:border-gray-800 dark:bg-[#1a1916]">
                {role && (
                  <div>
                    <h3 className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                      Роль
                    </h3>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {role}
                    </div>
                  </div>
                )}

                {period && (
                  <div>
                    <h3 className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                      Период
                    </h3>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {period}
                    </div>
                  </div>
                )}

                {techStack && techStack.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                      Технологии
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-gray-200 px-2.5 py-1 text-xs font-medium tracking-wider text-gray-600 uppercase dark:border-gray-700 dark:text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            {imgSrc && (
              <ImageReveal className="mb-10 w-full">
                <div className="relative w-full overflow-hidden border border-gray-200 dark:border-gray-800">
                  <Image
                    src={imgSrc}
                    alt={title}
                    width={1200}
                    height={630}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </ImageReveal>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {children}

              {content.gallery && content.gallery.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
                  <h2 className="font-display mb-6 text-2xl text-gray-900 dark:text-gray-100">
                    Галерея
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {content.gallery.map((img, index) => (
                      <ImageReveal key={index} delay={index * 0.05}>
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-800">
                          <Image
                            src={img}
                            alt={`${title} — изображение ${index + 1}`}
                            width={800}
                            height={600}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </ImageReveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-10">
          <div className="flex flex-col border-t border-gray-200 pt-8 text-sm font-medium sm:flex-row sm:justify-between dark:border-gray-800">
            {prev && prev.path && (
              <div className="pt-4 sm:pt-0">
                <Link
                  href={`/${prev.path}`}
                  className="group flex items-center text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  aria-label={`Предыдущий проект: ${prev.title}`}
                >
                  <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
                  {prev.title}
                </Link>
              </div>
            )}
            {next && next.path && (
              <div className="pt-4 sm:pt-0">
                <Link
                  href={`/${next.path}`}
                  className="group flex items-center text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  aria-label={`Следующий проект: ${next.title}`}
                >
                  {next.title}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>
    </>
  )
}
