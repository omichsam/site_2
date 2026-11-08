import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { ArrowRightIcon } from './icons'
import { services, type ServiceIcon } from '../content/services'
import Photo from './Photo'

export const SERVICE_AREA: Record<ServiceIcon, string> = {
  briefcase: 'Outsourcing',
  search: 'Talent',
  wallet: 'Payroll',
  files: 'Workforce',
  graduation: 'Learning',
  scale: 'Advisory',
  clock: 'Staffing',
  heart: 'Benefits',
}

// The eight services as tabs beside one large photo that crossfades between
// them. Only the selected tab shows its summary, so eight fit in the height of
// the photo panel.
export default function ServicesTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = services.length - 1
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (active === last ? 0 : active + 1)
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (active === 0 ? last : active - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const service = services[active]

  return (
    <div className={`${styles.solutions} ${styles.solutionsCompact}`}>
      <div className={styles.solutionTabs} role="tablist" aria-label="Our services" aria-orientation="vertical">
        {services.map((item, i) => (
          <button
            key={item.slug}
            id={`tab-${item.slug}`}
            ref={(el) => { tabRefs.current[i] = el }}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="service-panel"
            tabIndex={i === active ? 0 : -1}
            className={`${styles.solutionTab} ${i === active ? styles.solutionTabActive : ''}`}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            <span className={styles.solutionTabNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.solutionTabText}>
              <b>{item.title}</b>
              <small>{item.summary}</small>
            </span>
            <ArrowRightIcon className={styles.solutionTabArrow} />
          </button>
        ))}
      </div>

      <div id="service-panel" role="tabpanel" aria-labelledby={`tab-${service.slug}`} className={styles.solutionPanel}>
        <div className={styles.solutionMedia}>
          {services.map((item, i) => (
            <Photo
              key={item.slug}
              src={item.image}
              alt={i === active ? item.imageAlt : ''}
              sizes="(max-width: 980px) 100vw, 640px"
              className={`${styles.solutionImg} ${i === active ? styles.solutionImgActive : ''}`}
            />
          ))}
        </div>
        {/* Keyed so the text replays its entrance whenever the tab changes. */}
        <div key={service.slug} className={styles.solutionBody}>
          <span className={styles.solutionEyebrow}>
            {String(active + 1).padStart(2, '0')} · {SERVICE_AREA[service.icon]}
          </span>
          <h3>{service.title}</h3>
          <p>{service.introduction}</p>
          <ul className={styles.solutionList}>
            {service.activities.slice(0, 3).map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
          <Link to={`/services/${service.slug}`} className={styles.solutionLink}>
            Explore this service <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
