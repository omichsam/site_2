// The site may be served from a subfolder (GitHub Pages project sites), so
// public files and router paths are prefixed with Vite's base URL.
const BASE = import.meta.env.BASE_URL

export const ROUTER_BASENAME = BASE === '/' ? undefined : BASE.replace(/\/$/, '')

export function asset(path: string) {
  return `${BASE}${path.replace(/^\//, '')}`
}
