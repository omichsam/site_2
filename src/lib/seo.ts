// Every page's title, description, share image and structured data, in one
// place. Used by the browser (useRouteMeta, on each navigation) and by
// scripts/prerender.mjs (written into each page's HTML at build time), so the
// two can never disagree.
import { company, CONTACT } from '../content/company'
import { services } from '../content/services'
import { articles } from '../content/insights'

/** The public address the site is served from, without a trailing slash. Set VITE_SITE_URL for a custom domain. */
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://omichsam.github.io/site_2').replace(/\/$/, '')
export const SITE_NAME = 'Avenyra Global'
const HOME_TITLE = 'Avenyra Global | HR Outsourcing, Recruitment & Payroll in Kenya'

export interface Crumb { name: string; path: string }
export interface PageMeta {
  title: string
  description: string
  /** Share image name in public/og (without .jpg). */
  og: string
  type?: 'website' | 'article'
  crumbs?: Crumb[]
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
}

/** Canonical address of a page. Folders end with a slash, matching how GitHub Pages serves them. */
export function canonicalUrl(path: string) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, '')}/`
}
export function fullTitle(meta: PageMeta) {
  return meta.title === SITE_NAME ? HOME_TITLE : `${meta.title} | ${SITE_NAME}`
}
export function ogImageUrl(meta: PageMeta) {
  return `${SITE_URL}/og/${meta.og}.jpg`
}

const ORG_ID = `${SITE_URL}/#organization`
const ORGANIZATION = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NAME,
  slogan: company.tagline,
  description: company.metaDescription,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo-512.png`,
  image: `${SITE_URL}/og/home.jpg`,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  areaServed: { '@type': 'Country', name: 'Kenya' },
  knowsAbout: services.map((s) => s.title),
}
const ORG_REF = { '@id': ORG_ID }

const home: Crumb = { name: 'Home', path: '/' }
const servicesCrumb: Crumb = { name: 'Our Services', path: '/services' }
const insightsCrumb: Crumb = { name: 'Insights', path: '/insights' }

const STATIC: Record<string, PageMeta> = {
  '/': {
    title: SITE_NAME,
    description: company.metaDescription,
    og: 'home',
    jsonLd: [
      { '@context': 'https://schema.org', ...ORGANIZATION },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/`, publisher: ORG_REF },
    ],
  },
  '/about': {
    title: 'About Us',
    description: 'Avenyra Global is a people-centred human resource outsourcing, recruitment and workforce solutions company based in Nairobi.',
    og: 'about',
    crumbs: [home, { name: 'About Us', path: '/about' }],
  },
  '/services': {
    title: 'Our Services',
    description: 'HR outsourcing, recruitment, payroll, contract workforce management, training, HR advisory, temporary staffing and benefits administration in Kenya.',
    og: 'services',
    crumbs: [home, servicesCrumb],
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Avenyra Global services',
      itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: canonicalUrl(`/services/${s.slug}`) })),
    }],
  },
  '/industries': {
    title: 'Industries',
    description: 'Workforce support for government, NGOs, financial services, healthcare, construction, manufacturing, hospitality, SMEs and corporates.',
    og: 'industries',
    crumbs: [home, { name: 'Industries', path: '/industries' }],
  },
  '/careers': {
    title: 'Careers',
    description: 'View vacancies approved for publication by Avenyra Global, or register your CV for future opportunities in Kenya.',
    og: 'careers',
    crumbs: [home, { name: 'Careers', path: '/careers' }],
  },
  '/insights': {
    title: 'Insights',
    description: 'Practical notes on HR management, recruitment, employment practices, payroll, career development and leadership.',
    og: 'insights',
    crumbs: [home, insightsCrumb],
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Start a conversation with Avenyra Global about human resource, recruitment and payroll support. Based in Nairobi, Kenya.',
    og: 'contact',
    crumbs: [home, { name: 'Contact Us', path: '/contact' }],
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Avenyra Global', url: canonicalUrl('/contact'), about: { ...ORGANIZATION } }],
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'How Avenyra Global handles enquiries, candidate details and CVs submitted through this website.',
    og: 'home',
    crumbs: [home, { name: 'Privacy Policy', path: '/privacy' }],
  },
  '/terms': {
    title: 'Terms & Conditions',
    description: 'The terms that apply to using the Avenyra Global website.',
    og: 'home',
    crumbs: [home, { name: 'Terms & Conditions', path: '/terms' }],
  },
}

function serviceMeta(slug: string): PageMeta | undefined {
  const s = services.find((x) => x.slug === slug)
  if (!s) return undefined
  const path = `/services/${s.slug}`
  return {
    title: s.title,
    description: s.summary,
    og: `service-${s.slug}`,
    crumbs: [home, servicesCrumb, { name: s.title, path }],
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.title,
      serviceType: s.title,
      description: s.description,
      url: canonicalUrl(path),
      image: `${SITE_URL}/og/service-${s.slug}.jpg`,
      areaServed: { '@type': 'Country', name: 'Kenya' },
      provider: { '@type': 'ProfessionalService', name: SITE_NAME, url: `${SITE_URL}/` },
    }],
  }
}

function articleMeta(slug: string): PageMeta | undefined {
  const a = articles.find((x) => x.slug === slug)
  if (!a) return undefined
  const path = `/insights/${a.slug}`
  return {
    title: a.title,
    description: a.description,
    og: `insight-${a.slug}`,
    type: 'article',
    crumbs: [home, insightsCrumb, { name: a.title, path }],
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      articleSection: a.category,
      image: `${SITE_URL}/og/insight-${a.slug}.jpg`,
      mainEntityOfPage: canonicalUrl(path),
      author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-512.png` } },
    }],
  }
}

export const NOT_FOUND_META: PageMeta = {
  title: 'Page not found',
  description: 'The page you are looking for has moved or does not exist.',
  og: 'home',
  noindex: true,
}

/** Metadata for a route, or the "not found" metadata for an unknown one. */
export function getPageMeta(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  if (STATIC[path]) return STATIC[path]
  const service = path.match(/^\/services\/([^/]+)$/)
  if (service) return serviceMeta(service[1]) ?? NOT_FOUND_META
  const article = path.match(/^\/insights\/([^/]+)$/)
  if (article) return articleMeta(article[1]) ?? NOT_FOUND_META
  return NOT_FOUND_META
}

/** Structured data blocks for a page: its own blocks plus breadcrumbs. */
export function structuredData(meta: PageMeta) {
  const blocks = [...(meta.jsonLd ?? [])]
  if (meta.crumbs) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: meta.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: canonicalUrl(c.path) })),
    })
  }
  return blocks
}

/** Every page to prerender at build time. */
export const PRERENDER_ROUTES: string[] = [
  ...Object.keys(STATIC),
  ...services.map((s) => `/services/${s.slug}`),
  ...articles.map((a) => `/insights/${a.slug}`),
]

/** Share images to generate: name → { title, kicker, photo }. Used by scripts/make-og.mjs. */
export function ogImageSpecs() {
  const specs: Record<string, { title: string; kicker: string; photo: string }> = {
    home: { title: 'Empowering people. Strengthening organisations.', kicker: 'People. Potential. Progress.', photo: '/images/team-high-five.jpg' },
    about: { title: 'A people-centred workforce partner.', kicker: 'About Avenyra Global', photo: '/images/colleagues.jpg' },
    services: { title: 'Eight integrated HR services. One workforce partner.', kicker: 'Our Services', photo: '/images/women-team.jpg' },
    industries: { title: 'Supporting organisations across diverse industries.', kicker: 'Industries', photo: '/images/meeting-room.jpg' },
    careers: { title: 'Talent creates possibilities. Opportunities create futures.', kicker: 'Careers', photo: '/images/smiling-portrait.jpg' },
    insights: { title: 'Practical notes on people and work.', kicker: 'Insights', photo: '/images/woman-laptop-office.jpg' },
    contact: { title: 'Let’s start a conversation.', kicker: 'Contact · Nairobi, Kenya', photo: '/images/nairobi-skyline.jpg' },
  }
  for (const s of services) specs[`service-${s.slug}`] = { title: s.title, kicker: 'Our Services', photo: s.image }
  for (const a of articles) specs[`insight-${a.slug}`] = { title: a.title, kicker: `Insights · ${a.category}`, photo: a.image }
  return specs
}
