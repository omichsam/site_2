import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { ArrowRightIcon } from './icons'
import type { ServiceIcon } from '../content/services'
import { pillars } from '../content/pillars'
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
  globe: 'Global Workforce',
  monitor: 'Remote Teams',
  chip: 'Technology',
}

// The four service pillars as tabs beside one large photo that crossfades
// between them. Only the selected tab shows its summary.
export default function ServicesTabs() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = pillars.length - 1
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

  const pillar = pillars[active]

  return (
    <div className={`${styles.solutions} ${styles.solutionsCompact}`}>
      <div className={styles.solutionTabs} role="tablist" aria-label="Our service pillars" aria-orientation="vertical">
        {pillars.map((item, i) => (
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

      <div id="service-panel" role="tabpanel" aria-labelledby={`tab-${pillar.slug}`} className={styles.solutionPanel}>
        <div className={styles.solutionMedia}>
          {pillars.map((item, i) => (
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
        <div key={pillar.slug} className={styles.solutionBody}>
          <span className={styles.solutionEyebrow}>
            {String(active + 1).padStart(2, '0')} · {pillar.title}
          </span>
          <h3>{pillar.headline}</h3>
          <ul className={styles.solutionList}>
            {pillar.includes.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link to={`/services/${pillar.slug}`} className={styles.solutionLink}>
            Explore {pillar.title} <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
