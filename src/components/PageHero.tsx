import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { asset } from '../lib/asset'

interface Crumb { label: string; to?: string }

// Inner page opening: text on the left, a framed photo on the right with a
// tinted offset panel and a floating badge, in the same style as the home page.
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  badge,
  crumbs,
  children,
}: {
  eyebrow: string
  title: string
  lede: string
  image: string
  imageAlt: string
  badge?: { icon: ReactNode; title: string; detail: string }
  crumbs?: Crumb[]
  children?: ReactNode
}) {
  return (
    <section className={styles.pageHero}>
      <div className={`${styles.wrap} ${styles.pageHeroGrid}`}>
        <div className={styles.pageHeroText}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className={styles.crumbs}>
              <Link to="/">Home</Link>
              {crumbs.map((crumb) => (
                <span key={crumb.label}>
                  <span aria-hidden="true">/</span>
                  {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
                </span>
              ))}
            </nav>
          )}
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h1>{title}</h1>
          <p className={styles.lede}>{lede}</p>
          {children}
        </div>
        <div className={styles.workforceMedia}>
          <div className={`${styles.workforcePhoto} ${styles.pageHeroPhoto}`}>
            <img src={asset(image)} alt={imageAlt} width={1400} height={935} />
          </div>
          {badge && (
            <div className={styles.workforceBadge}>
              <span className={styles.workforceBadgeIcon}>{badge.icon}</span>
              <span>
                <b>{badge.title}</b>
                <small>{badge.detail}</small>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
