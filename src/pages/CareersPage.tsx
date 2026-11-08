import type { ReactNode } from 'react'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import EnquiryForm from '../components/EnquiryForm'
import { CheckIcon, TeamIcon } from '../components/icons'
import { employmentTypes } from '../content/company'
import Photo from '../components/Photo'

const FIELDS: { title: string; roles: string; icon: ReactNode }[] = [
  { title: 'Human Resources', roles: 'HR officers, generalists, assistants and administrators.', icon: <path d="M9 7.5a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM4 20c.7-3.8 3.9-6 8-6s7.3 2.2 8 6" /> },
  { title: 'Finance & Payroll', roles: 'Payroll officers, accounts assistants and finance clerks.', icon: <><rect x="3.5" y="6" width="17" height="12" rx="2.5" /><circle cx="12" cy="12" r="2.5" /><path d="M7 9.5v5M17 9.5v5" /></> },
  { title: 'Administration', roles: 'Office administrators, receptionists and data clerks.', icon: <><path d="M8 4h7l4 4v11a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="M15 4v4h4M9.5 12.5h5M9.5 16h5" /></> },
  { title: 'Healthcare', roles: 'Nurses, clinical officers and healthcare assistants.', icon: <path d="M12 20s-7.5-4.5-7.5-10A4.2 4.2 0 0 1 12 7.5 4.2 4.2 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10ZM12 10.5v5M9.5 13h5" /> },
  { title: 'Engineering', roles: 'Site technicians, engineers and skilled trades.', icon: <><path d="M4 17h16v2H4zM6 17a6 6 0 0 1 12 0" /><path d="M10 11V7.5h4V11" /></> },
  { title: 'Hospitality', roles: 'Chefs, waiting staff, housekeeping and front office.', icon: <><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" /><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 4.5v2M11 3.5v3M14 4.5v2" /></> },
]

const STEPS = [
  { step: '01', title: 'Read the role', text: 'Check the duties, location, employment type and closing date before you apply.' },
  { step: '02', title: 'Apply or register', text: 'Apply for a published vacancy, or register your CV for future opportunities.' },
  { step: '03', title: 'Screening', text: 'Applications are screened against the criteria agreed with the hiring organisation.' },
  { step: '04', title: 'Interview and feedback', text: 'Shortlisted candidates are invited to interview. People formally assessed receive feedback.' },
]

export default function CareersPage() {

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'Careers' }]}
        eyebrow="Careers"
        title="Talent creates possibilities. Opportunities create futures."
        lede="We connect talented individuals with organisations seeking capable, motivated and skilled professionals. Only vacancies approved for publication are shown here."
        image="/images/smiling-portrait.jpg"
        imageAlt="A smiling professional in an office"
        badge={{ icon: <TeamIcon />, title: 'Register your CV', detail: 'Stored privately, never published' }}
      >
        <div className={styles.heroCtas}>
          <a href="#submit-cv" className={`${styles.btn} ${styles.btnPrimary}`}>Submit Your CV</a>
          <a href="#opportunities" className={`${styles.btn} ${styles.btnGhost}`}>Current Opportunities</a>
        </div>
      </PageHero>

      {/* Career fields */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
            <div>
              <div className={styles.eyebrow}>Career Fields</div>
              <h2>Where we place people.</h2>
            </div>
            <p>
              Employment types: {employmentTypes.join(', ').replace(/, ([^,]*)$/, ' and $1')}.
            </p>
          </Reveal>
          <div className={styles.fieldGrid}>
            {FIELDS.map((field, i) => (
              <Reveal key={field.title} delay={(i % 3) * 90} className={styles.fieldCard}>
                <span className={styles.fieldIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{field.icon}</svg>
                </span>
                <b>{field.title}</b>
                <small>{field.roles}</small>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.wrap} ${styles.workforceSplit}`}>
          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Current Opportunities</div>
            <h2>No vacancies are published right now.</h2>
            <p className={styles.workforceLede}>
              Vacancies appear here only once the hiring organisation has approved them for publication. Register
              your CV below and we will contact you when a suitable role opens.
            </p>
            <ul className={styles.checkList}>
              <li><CheckIcon size={16} /> Every vacancy states its duties, location and employment type</li>
              <li><CheckIcon size={16} /> Temporary roles are always described as temporary</li>
              <li><CheckIcon size={16} /> Your CV is never shown on a public page</li>
            </ul>
          </Reveal>
          <Reveal className={styles.workforceMedia}>
            <div className={styles.workforcePhoto}>
              <Photo src="/images/document-review.jpg" alt="A professional reading through a document" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How recruitment works */}
      <section className={styles.processBand}>
        <div className={styles.wrap}>
          <Reveal className={styles.processHead}>
            <div>
              <div className={`${styles.eyebrow} ${styles.eyebrowLight}`}>For Candidates</div>
              <h2>How our recruitment process works.</h2>
            </div>
            <p>A respectful, consistent process for everyone who applies.</p>
          </Reveal>
          <Reveal className={styles.timeline}>
            <div className={styles.timelineTrack} aria-hidden="true" />
            <ol className={styles.timelineSteps}>
              {STEPS.map((step) => (
                <li key={step.step} className={styles.timelineStep}>
                  <span className={styles.timelineNode} aria-hidden="true">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* CV form */}
      <section id="submit-cv" className={styles.section}>
        <div className={`${styles.wrap} ${styles.contactGrid}`}>
          <Reveal className={styles.contactIntro}>
            <div className={styles.eyebrow}>Submit Your CV</div>
            <h2>Register for future opportunities.</h2>
            <p className={styles.contactLede}>
              Share a few details about yourself and the work you are looking for. PDF and DOCX files are accepted.
              Your CV is kept private and is used only for recruitment follow-up.
            </p>
            <div className={styles.contactPhoto}>
              <Photo src="/images/laptop-floor.jpg" alt="A professional working on her laptop" />
            </div>
          </Reveal>
          <div className={styles.contactFormCard}>
            <EnquiryForm kind="cv" />
          </div>
        </div>
      </section>
    </Layout>
  )
}
