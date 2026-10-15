import siteMetadata from '@/data/siteMetadata'

interface Crumb {
  name: string
  // путь от корня сайта со слешем на конце, '' для главной
  path: string
}

// JSON-LD BreadcrumbList для вложенных страниц (хлебные крошки в выдаче Яндекса и Google).
// Адреса со слешем на конце, как canonical при trailingSlash: true.
export default function SchemaBreadcrumbLd({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteMetadata.siteUrl}/${item.path}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
