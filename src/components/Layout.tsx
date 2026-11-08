import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Header from './Header'
import Footer from './Footer'
import ScrollTopButton from './ScrollTopButton'
import { useRouteMeta } from '../lib/usePageMeta'
import { startClickTracking, trackPage } from '../lib/analytics'

// Every page shares the header, the footer and the brand tokens on .page.
export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  useRouteMeta()

  // One page view per page visited (after useRouteMeta has set the title).
  useEffect(() => {
    startClickTracking()
    trackPage(pathname)
  }, [pathname])

  // New page: start at the top, or at the #anchor when one is given.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    jump()
    // Sections below the fold are laid out only as they near the screen
    // (content-visibility), so their real heights arrive after the first jump.
    // Jump again once they have settled so the anchor lands exactly.
    const frame = requestAnimationFrame(jump)
    const timers = [150, 450].map((ms) => window.setTimeout(jump, ms))
    return () => {
      cancelAnimationFrame(frame)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [pathname, hash])

  return (
    <div className={styles.page}>
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ScrollTopButton />
    </div>
  )
}
