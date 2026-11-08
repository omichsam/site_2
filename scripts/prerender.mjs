// Turns every page into real HTML after `vite build`, so visitors see content
// before JavaScript loads and search engines and link previews (WhatsApp,
// LinkedIn…) get the right title, description, image and structured data.
//
// Output, all in dist/:
//   index.html, <route>/index.html   one prerendered page per route
//   404.html                         the "page not found" page (GitHub Pages serves it for unknown paths)
//   sitemap.xml, robots.txt
//
// Runs as part of `npm run build`; needs the SSR bundle in dist-server/.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const server = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href)
const { render, PRERENDER_ROUTES, getPageMeta, structuredData, fullTitle, canonicalUrl, ogImageUrl, SITE_URL } = server

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const ROOT_DIV = '<div id="root"></div>'
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
if (!template.includes(ROOT_DIV)) throw new Error(`prerender: ${ROOT_DIV} not found in dist/index.html`)
if (!SEO_BLOCK.test(template)) throw new Error('prerender: <!--seo:start--> … <!--seo:end--> block not found in dist/index.html')

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headFor(pathname, meta) {
  const title = esc(fullTitle(meta))
  const description = esc(meta.description)
  const url = canonicalUrl(pathname)
  const image = ogImageUrl(meta)
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    ...(meta.noindex ? [] : [`<link rel="canonical" href="${url}" />`]),
    `<meta property="og:type" content="${meta.type ?? 'website'}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]
  if (!meta.noindex) {
    for (const block of structuredData(meta)) {
      tags.push(`<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`)
    }
  }
  return tags.join('\n    ')
}

async function writePage(pathname, file) {
  const meta = getPageMeta(pathname)
  const html = template
    .replace(SEO_BLOCK, headFor(pathname, meta))
    .replace(ROOT_DIV, `<div id="root">${render(pathname)}</div>`)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, html)
  console.log(`prerendered ${pathname.padEnd(48)} → ${path.relative(root, file)}`)
}

for (const pathname of PRERENDER_ROUTES) {
  const file = pathname === '/' ? path.join(dist, 'index.html') : path.join(dist, pathname.slice(1), 'index.html')
  await writePage(pathname, file)
}
// Any unknown path renders the not-found page, so the browser hydrates it cleanly.
await writePage('/__not-found__', path.join(dist, '404.html'))

const today = new Date().toISOString().slice(0, 10)
const urls = PRERENDER_ROUTES.map((p) => `  <url><loc>${canonicalUrl(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n')
await fs.writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`sitemap.xml: ${PRERENDER_ROUTES.length} URLs on ${SITE_URL}`)
