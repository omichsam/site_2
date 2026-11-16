// The four service pillars. The eight original services sit beneath them as
// supporting services, each keeping its own page. A pillar shows the photos of
// its own services, so a photo still belongs to one subject; only Workforce
// Technology, which has no supporting service pages, has photos of its own.
import { getService, type Service, type ServiceIcon } from './services'

export interface Pillar {
  slug: string
  title: string
  /** One line for tabs and cards. */
  summary: string
  /** The pillar's promise, used as its heading. */
  headline: string
  intro: string
  includes: string[]
  idealFor: string
  /** Slugs of the services grouped under this pillar, most relevant first. */
  serviceSlugs: string[]
  icon: ServiceIcon
  image: string
  imageAlt: string
  image2: string
  image2Alt: string
}

const services = (slugs: string[]) => slugs.map((s) => getService(s)).filter((s): s is Service => !!s)

/** Main photo from the first service, inset from the second (or the first service's second photo). */
function photosFrom(slugs: string[]) {
  const [a, b] = services(slugs)
  return b
    ? { image: a.image, imageAlt: a.imageAlt, image2: b.image, image2Alt: b.imageAlt }
    : { image: a.image, imageAlt: a.imageAlt, image2: a.image2, image2Alt: a.image2Alt }
}

const GLOBAL = ['payroll-management']
const REMOTE = ['contract-workforce-management', 'temporary-staffing']
const HUMAN = ['recruitment-talent-acquisition', 'hr-outsourcing', 'hr-advisory-compliance', 'employee-benefits-administration', 'training-development']

export const pillars: Pillar[] = [
  {
    slug: 'global-workforce-solutions',
    title: 'Global Workforce Solutions',
    summary: 'Partner-enabled EOR support, payroll coordination and local workforce administration in Kenya.',
    headline: 'Establish and support your workforce in Kenya.',
    intro:
      'Hiring in a new market involves more than finding the right people. We help international organisations coordinate the employment arrangements, payroll processes and local workforce administration needed to support their teams in Kenya.',
    includes: [
      'Partner-enabled Employer of Record (EOR) support',
      'Payroll coordination and statutory administration',
      'Employment onboarding and offboarding coordination',
      'Local workforce compliance and documentation support',
      'Workforce setup guidance for organisations entering Kenya',
    ],
    idealFor:
      'International organisations establishing a Kenyan workforce, including those seeking an employment solution before setting up a local entity.',
    serviceSlugs: GLOBAL,
    icon: 'globe',
    ...photosFrom(GLOBAL),
  },
  {
    slug: 'remote-staffing-managed-workforce',
    title: 'Remote Staffing & Managed Workforce',
    summary: 'One dedicated professional or a full Kenya-based team, sourced, onboarded and supported.',
    headline: 'Build a Kenya-based team that works with your business.',
    intro:
      'Whether you need one dedicated professional or an entire team, we help you source, onboard and support Kenyan talent around your operating needs. Engagements can range from remote staffing under your day-to-day direction to managed workforce support with agreed reporting and coordination responsibilities.',
    includes: [
      'Dedicated remote staffing',
      'Remote team setup and onboarding',
      'Managed workforce coordination and reporting',
      'BPO and outsourced operations workforce support',
      'Project-based and temporary staffing',
      'Ongoing employee support and replacement coordination',
    ],
    idealFor:
      'Businesses building remote teams, expanding operational capacity or seeking a Kenyan workforce delivery partner.',
    serviceSlugs: REMOTE,
    icon: 'monitor',
    ...photosFrom(REMOTE),
  },
  {
    slug: 'human-capital-hr-solutions',
    title: 'Human Capital & HR Solutions',
    summary: 'Recruitment of Kenyan talent, and the HR support around people once they join.',
    headline: 'Find the right people and put effective HR support around them.',
    intro:
      'We recruit Kenyan talent for your business and help you manage the employee experience once people join. From a single recruitment assignment to an outsourced HR function, our support is shaped around your team, management structure and stage of growth.',
    includes: [
      'Recruitment and talent acquisition',
      'HR outsourcing and managed HR services',
      'HR advisory, policies and employment procedures',
      'Employee onboarding, records and benefits administration',
      'Performance management and employee relations support',
      'HR audits and organisational development support',
    ],
    idealFor: 'Organisations recruiting directly or seeking local HR expertise for an existing Kenyan team.',
    serviceSlugs: HUMAN,
    icon: 'search',
    ...photosFrom(HUMAN),
  },
  {
    slug: 'workforce-technology-transformation',
    title: 'Workforce Technology & Transformation',
    summary: 'Practical HR systems, digital workflows and workforce reporting for a growing team.',
    headline: 'Give your growing team the systems and processes it needs.',
    intro:
      'As your workforce grows, disconnected records and manual processes can make it harder to manage people consistently. We help you select and improve practical HR systems, workflows and reporting that support your Kenyan workforce and connect with your wider operations.',
    includes: [
      'HR technology advisory and system selection support',
      'HRIS implementation coordination and user support',
      'Digital employee records and onboarding workflows',
      'HR process digitisation and automation',
      'Workforce reporting, analytics and dashboards',
      'Process improvement and change support',
    ],
    idealFor:
      'Organisations bringing greater structure, visibility and efficiency to a growing or distributed workforce.',
    serviceSlugs: [],
    icon: 'chip',
    image: '/images/systems-desk.jpg',
    imageAlt: 'A professional working at a computer workstation in a bright office',
    image2: '/images/data-review.jpg',
    image2Alt: 'A professional reviewing printed charts beside her laptop',
  },
]

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug)
}

/** The pillar a service belongs to. */
export function pillarOf(serviceSlug: string) {
  return pillars.find((p) => p.serviceSlugs.includes(serviceSlug))
}

export function pillarServices(pillar: Pillar) {
  return services(pillar.serviceSlugs)
}

/** Three entry points shown above the pillars, so the most common needs are one click away. */
export const entryPoints = [
  { title: 'Recruit Talent in Kenya', detail: 'Search and selection, from brief to shortlist.', to: '/services/recruitment-talent-acquisition', icon: 'search' as ServiceIcon },
  { title: 'Build a Remote Team', detail: 'Dedicated professionals or a managed team.', to: '/services/remote-staffing-managed-workforce', icon: 'monitor' as ServiceIcon },
  { title: 'Establish Workforce Operations in Kenya', detail: 'EOR support, payroll and local administration.', to: '/services/global-workforce-solutions', icon: 'globe' as ServiceIcon },
]

export const headcountBands = ['1 person', '2 to 5', '6 to 20', '21 to 50', 'More than 50'] as const
