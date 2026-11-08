import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { ArrowRightIcon, PinIcon } from './icons'
import ServiceGlyph from './ServiceGlyph'
import type { ServiceIcon } from '../content/services'

const ORANGE = '#DF6E28'
const PERIWINKLE = '#7149CC'

const HIGHLIGHTS: { title: string; detail: string; icon: ServiceIcon; tone: string; to: string }[] = [
  { title: 'HR, outsourced.', detail: 'A defined people function, without building it in-house.', icon: 'briefcase', tone: ORANGE, to: '/services/hr-outsourcing' },
  { title: 'Talent, found.', detail: 'Structured search and selection, from brief to shortlist.', icon: 'search', tone: PERIWINKLE, to: '/services/recruitment-talent-acquisition' },
  { title: 'Payroll, on schedule.', detail: 'Pay runs from approved inputs, on a predictable calendar.', icon: 'wallet', tone: ORANGE, to: '/services/payroll-management' },
]

const STEP_MS = 3000

// The summary panel beside the hero headline. Each row is highlighted in turn;
// hovering a row selects it. Skipped for reduced motion and paused off screen.
export default function HeroShowcase() {
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(root)
    const timer = window.setInterval(() => {
      if (visible) setActive((current) => (current + 1) % HIGHLIGHTS.length)
    }, STEP_MS)
    return () => {
      window.clearInterval(timer)
      io.disconnect()
    }
  }, [])

  return (
    <div className={styles.heroShowcase} ref={rootRef}>
      <div className={styles.heroPanel}>
        <div className={styles.heroPanelHead}>
          <span className={styles.heroPanelTitle}>How we support you</span>
          <span className={styles.heroPanelChip}><PinIcon size={13} /> Nairobi, Kenya</span>
        </div>

        <ol className={styles.heroPanelList}>
          {HIGHLIGHTS.map((item, i) => (
            <li
              key={item.title}
              className={`${styles.heroRow} ${active === i ? styles.heroRowActive : ''}`}
              style={{ '--tone': item.tone } as CSSProperties}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.heroRowIcon}><ServiceGlyph name={item.icon} /></span>
              <Link to={item.to} className={styles.heroRowText}>
                <span className={styles.heroRowStep}>0{i + 1}</span>
                <b>{item.title}</b>
                <small>{item.detail}</small>
              </Link>
            </li>
          ))}
        </ol>

        <div className={styles.heroPanelFoot}>
          <span>HR · Recruitment · Payroll · Workforce</span>
          <Link to="/services" className={styles.heroPanelLink}>
            All services <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
