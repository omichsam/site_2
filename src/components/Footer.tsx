import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { LogoMark, ArrowRightIcon, PinIcon, PhoneIcon, EnvelopeIcon } from './icons'
import { services } from '../content/services'
import { company, CONTACT } from '../content/company'

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
            <h2>Let&rsquo;s build a stronger workforce together.</h2>
            <p>Every organisation deserves the right people and the right HR support.</p>
          </div>
          <div className={styles.footCtaActions}>
            <Link to="/contact?enquiry=consultation" className={`${styles.btn} ${styles.btnPrimary}`}>
              Request a Consultation <ArrowRightIcon />
            </Link>
            <a href={`mailto:${CONTACT.email}`} className={styles.footCtaMail}>
              <EnvelopeIcon /> {CONTACT.email}
            </a>
          </div>
        </div>

        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            <Link to="/" className={styles.brand} aria-label="Avenyra Global home">
              <LogoMark size={52} className={styles.footLogo} />
              <span className={styles.brandWord}>
                Avenyra
                <span>Global</span>
              </span>
            </Link>
            <p>Human resource outsourcing, recruitment and workforce solutions.</p>
            <p className={styles.footMotto}>{company.tagline}</p>
          </div>

          <nav className={styles.footCol} aria-label="Services">
            <h2>Services</h2>
            <ul>
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}><Link to={`/services/${service.slug}`}>{service.title}</Link></li>
              ))}
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
          <p>© {new Date().getFullYear()} Avenyra Global. All rights reserved.</p>
          <div className={styles.footLegal}>
            <span>Version {__APP_VERSION__}</span>
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
