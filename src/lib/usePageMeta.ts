import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { canonicalUrl, fullTitle, getPageMeta, ogImageUrl } from './seo'

function setTag(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

// Keeps the document head in step with the current page while browsing.
// The first load already has the right head from the prerendered HTML.
export function useRouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getPageMeta(pathname)
    const title = fullTitle(meta)
    const url = canonicalUrl(pathname)
    document.title = title
    setTag('meta[name="description"]', 'name', 'description', meta.description)
    setTag('meta[name="robots"]', 'name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow')
    setTag('meta[property="og:title"]', 'property', 'og:title', title)
    setTag('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setTag('meta[property="og:url"]', 'property', 'og:url', url)
    setTag('meta[property="og:image"]', 'property', 'og:image', ogImageUrl(meta))
    setTag('meta[property="og:type"]', 'property', 'og:type', meta.type ?? 'website')
    setTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)
    setTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImageUrl(meta))
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [pathname])
}
