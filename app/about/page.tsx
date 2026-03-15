import { Authors, allAuthors } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'

export const metadata = genPageMetadata({
  title: 'Обо мне',
  description:
    'Александр Виноградов — IT Директор с 11+ летним опытом в e-commerce и цифровой трансформации. Рост выручки в 87 раз, команды до 60 человек.',
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  if (!author) {
    return notFound()
  }
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
