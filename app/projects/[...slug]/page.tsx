import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'
import type { Project } from 'contentlayer/generated'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const project = allProjects.find((p) => p.slug === slug)

  if (!project) {
    return
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
      images: project.imgSrc ? [project.imgSrc] : [siteMetadata.socialBanner],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.imgSrc ? [project.imgSrc] : [siteMetadata.socialBanner],
    },
  }
}

export const generateStaticParams = async () => {
  return allProjects.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  
  const project = allProjects.find((p) => p.slug === slug) as Project
  if (!project) {
    return notFound()
  }

  const sortedProjects = allProjects
  const projectIndex = sortedProjects.findIndex((p) => p.slug === slug)
  const prev = sortedProjects[projectIndex + 1]
  const next = sortedProjects[projectIndex - 1]

  const mainContent = coreContent(project)

  return (
    <>
      <ProjectLayout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer code={project.body.code} components={components} toc={project.toc} />
      </ProjectLayout>
    </>
  )
}

