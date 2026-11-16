import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { LogoMark, ArrowRightIcon, PinIcon, PhoneIcon, EnvelopeIcon } from './icons'
import { pillars } from '../content/pillars'
import { company, CONTACT } from '../content/company'
import { currentRelease } from '../content/releases'

const ArrowUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 13V3M8 3 4 7M8 3l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footCta}>
          <div>
            <span className={styles.footCtaEyebrow}>Let&rsquo;s talk</span>
            <h2>Ready to build your team in Kenya?</h2>
            <p>Tell us which roles you need, how your team will work and where you need support. We will help you shape the right recruitment, staffing and workforce management approach.</p>
          </div>
          <div className={styles.footCtaActions}>
            <Link to="/contact?enquiry=consultation" className={`${styles.btn} ${styles.btnPrimary}`}>
              Request a Solution <ArrowRightIcon />
            </Link>
            <a href={`mailto:${CONTACT.email}`} className={styles.footCtaMail}>
              <EnvelopeIcon /> {CONTACT.email}
            </a>
          </div>
        </div>

        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            <Link to="/" className={styles.brand}>
              <LogoMark size={52} className={styles.footLogo} />
              <span className={styles.brandWord}>
                Avenyra{' '}
                <span>Global</span>
              </span>
            </Link>
            <p>Human resource outsourcing, recruitment and workforce solutions.</p>
            <p className={styles.footMotto}>{company.tagline}</p>
          </div>

          <nav className={styles.footCol} aria-label="Services">
            <h2>Services</h2>
            <ul>
              {pillars.map((pillar) => (
                <li key={pillar.slug}><Link to={`/services/${pillar.slug}`}>{pillar.title}</Link></li>
              ))}
              <li><Link to="/services/recruitment-talent-acquisition">Recruitment</Link></li>
              <li><Link to="/services">All services</Link></li>
            </ul>
          </nav>

          <nav className={styles.footCol} aria-label="Company">
            <h2>Company</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          <div className={styles.footCol}>
            <h2>Get in Touch</h2>
            <ul className={styles.footContact}>
              <li><span className={styles.footContactIcon}><PinIcon /></span>{CONTACT.location}</li>
              <li>
                <span className={styles.footContactIcon}><PhoneIcon /></span>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
              </li>
              <li>
                <span className={styles.footContactIcon}><EnvelopeIcon /></span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footBottom}>
          {/* The prerendered year can lag the visitor's clock; let React fix it quietly. */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} Avenyra Global. All rights reserved.</p>
          <div className={styles.footLegal}>
            <Link to="/releases" title="What’s new in this version">
              Version {__APP_VERSION__} · {currentRelease(__APP_VERSION__).name}
            </Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
          <button
            type="button"
            className={styles.footTopBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  )
}
