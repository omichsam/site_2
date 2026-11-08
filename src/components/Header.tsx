import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { LogoMark } from './icons'
import { nav } from '../content/company'

// Home is reached through the logo, so the menu lists the other pages.
const LINKS = nav.filter((link) => link.href !== '/' && link.href !== '/contact')

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <nav className={styles.nav} aria-label="Primary">
          <Link to="/" className={styles.brand}>
            <LogoMark />
            <span className={styles.brandWord}>
              Avenyra{' '}
              <span>Global</span>
            </span>
          </Link>

          <ul className={styles.navlinks}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} className={({ isActive }) => (isActive ? styles.navActive : undefined)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.navcta}>
            <Link to="/contact" className={styles.navBtnGhost}>Contact Us</Link>
            <Link to="/contact?enquiry=consultation" className={styles.navBtnPrimary}>Request a Consultation</Link>
          </div>

          <button
            className={styles.burger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </nav>

        <div id="mobile-navigation" className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
          <Link to="/">Home</Link>
          {LINKS.map((link) => (
            <Link key={link.href} to={link.href}>{link.label}</Link>
          ))}
          <Link to="/contact">Contact Us</Link>
          <Link to="/contact?enquiry=consultation">Request a Consultation</Link>
        </div>
      </div>
    </header>
  )
}
