// Build-time renderer used by scripts/prerender.mjs. It must produce the same
// tree as main.tsx so the browser can hydrate the HTML without re-rendering.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { ROUTER_BASENAME } from './lib/asset'

export {
  canonicalUrl,
  fullTitle,
  getPageMeta,
  ogImageSpecs,
  ogImageUrl,
  PRERENDER_ROUTES,
  SITE_URL,
  structuredData,
} from './lib/seo'

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter basename={ROUTER_BASENAME} location={(ROUTER_BASENAME ?? '') + url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
