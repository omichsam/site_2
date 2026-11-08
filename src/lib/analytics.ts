// Visit statistics with GoatCounter (https://avenyra.goatcounter.com):
// anonymous, no cookies, so no consent banner is needed.
//
// The script tag in index.html loads count.js with automatic counting turned
// off ("no_onload"); this module counts each page view itself, because moving
// between pages here doesn't reload the page. count.js ignores localhost, so
// development and local previews are never counted.

interface GoatCounter {
  count: (vars: { path: string; title?: string; event?: boolean }) => void
}
declare global {
  interface Window { goatcounter?: GoatCounter }
}

const pending: (() => void)[] = []
let polling = false

// count.js loads asynchronously; hold calls until it is ready (or give up after ~10s).
function whenReady(fn: () => void) {
  if (typeof window === 'undefined') return
  if (window.goatcounter?.count) { fn(); return }
  pending.push(fn)
  if (polling) return
  polling = true
  let tries = 0
  const timer = window.setInterval(() => {
    tries += 1
    if (window.goatcounter?.count) {
      window.clearInterval(timer)
      polling = false
      pending.splice(0).forEach((f) => f())
    } else if (tries > 40) {
      window.clearInterval(timer)
      polling = false
      pending.length = 0
    }
  }, 250)
}

/** Count a page view. `path` is the route without the site's base folder, e.g. /services/payroll-management. */
export function trackPage(path: string) {
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path
  whenReady(() => window.goatcounter!.count({ path: clean, title: document.title }))
}

/** Count an action, e.g. "cta-consultation". Shown under Events in the dashboard. */
export function trackEvent(name: string, title = name) {
  whenReady(() => window.goatcounter!.count({ path: name, title, event: true }))
}

// Names click events from the link itself, so buttons need no extra markup:
// consultation and contact links, CV links, phone, email and WhatsApp.
function eventForLink(a: HTMLAnchorElement): string | null {
  if (a.dataset.track) return a.dataset.track
  const href = a.getAttribute('href') ?? ''
  if (href.startsWith('mailto:')) return 'click-email'
  if (href.startsWith('tel:')) return 'click-phone'
  if (/wa\.me|whatsapp/i.test(href)) return 'click-whatsapp'
  if (href.includes('/contact?enquiry=consultation')) return 'cta-consultation'
  if (href.includes('/contact?enquiry=service')) return 'cta-discuss-service'
  if (href.includes('#submit-cv')) return 'cta-submit-cv'
  if (/\/contact\/?$/.test(href)) return 'cta-contact'
  return null
}

let listening = false
/** Start counting clicks on tracked links (once per page load). */
export function startClickTracking() {
  if (listening || typeof document === 'undefined') return
  listening = true
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a')
    if (!a) return
    const name = eventForLink(a as HTMLAnchorElement)
    if (!name) return
    const where = window.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '') || '/'
    trackEvent(name, `${(a.textContent ?? '').trim().slice(0, 60)} (from ${where})`)
  }, { capture: true })
}
