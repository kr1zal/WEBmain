import { MetadataRoute } from 'next'
import { allBlogs, allProjects } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

// Адреса со слешем на конце: в next.config.js trailingSlash: true и canonical тоже со слешем,
// иначе поисковик ходит через редирект. lastModified только там, где есть реальная дата
// в frontmatter: дата сборки у всех страниц разом обесценивает поле.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const route = (path: string) => (path ? `${siteUrl}/${path}/` : `${siteUrl}/`)

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: route(post.path),
      lastModified: post.lastmod || post.date,
    }))

  const projectRoutes = allProjects.map((project) => ({
    url: route(`projects/${project.slug}`),
    ...(project.lastmod ? { lastModified: project.lastmod } : {}),
  }))

  // /blog попадает в sitemap только при наличии опубликованных постов
  // (app/tags удалён, пока блога нет; при восстановлении добавить сюда 'tags')
  const staticPaths = ['', 'projects', 'about', 'contact']
  if (blogRoutes.length > 0) staticPaths.push('blog')
  const staticRoutes = staticPaths.map((path) => ({ url: route(path) }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
