import { readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://dimuthmenikgama.com'

const routes = ['/', '/about', '/blog', '/portfolio', '/contact']

async function getBlogSlugsFromJson() {
  try {
    const p = path.join(process.cwd(), 'data', 'blogs.json')
    const raw = await readFile(p, 'utf-8')
    const items = JSON.parse(raw)
    return items.filter((i) => i.type === 'internal' && i.slug).map((i) => `/blog/${i.slug}`)
  } catch {
    return []
  }
}

async function getBlogSlugsFromMdx() {
  try {
    const dir = path.join(process.cwd(), 'content', 'blog')
    const files = await readdir(dir)
    return files.filter((f) => f.endsWith('.mdx')).map((f) => `/blog/${f.replace(/\.mdx$/, '')}`)
  } catch {
    return []
  }
}

function isoNow() {
  return new Date().toISOString()
}

function buildSitemap(urls) {
  const items = urls
    .map((loc) => `  <url>\n    <loc>${siteUrl.replace(/\/$/, '')}${loc}</loc>\n    <lastmod>${isoNow()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${loc === '/' ? '1.0' : '0.7'}</priority>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
}

async function main() {
  const blogJson = await getBlogSlugsFromJson()
  const blogMdx = await getBlogSlugsFromMdx()
  const all = Array.from(new Set([...routes, ...blogJson, ...blogMdx]))

  const outDir = path.join(process.cwd(), 'public')
  const sitemap = buildSitemap(all)
  await writeFile(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
  const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml\n`
  await writeFile(path.join(outDir, 'robots.txt'), robots, 'utf-8')
  console.log('Generated sitemap.xml and robots.txt in public/')
}

main().catch((e) => {
  console.error('Failed to generate sitemap:', e)
  process.exit(0)
})
