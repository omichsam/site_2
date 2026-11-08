import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Header from './Header'
import Footer from './Footer'
import ScrollTopButton from './ScrollTopButton'
import { useRouteMeta } from '../lib/usePageMeta'

// Every page shares the header, the footer and the brand tokens on .page.
export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  useRouteMeta()

  // New page: start at the top, or at the #anchor when one is given.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
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
