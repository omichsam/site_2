import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import EnquiryForm from '../components/EnquiryForm'
import { CheckIcon, TeamIcon } from '../components/icons'
import { employmentTypes } from '../content/company'
import Photo from '../components/Photo'

const FIELDS = [
  { title: 'Human Resources', image: '/images/hr-meeting.jpg' },
  { title: 'Finance & Payroll', image: '/images/payroll-laptop.jpg' },
  { title: 'Administration', image: '/images/desk-call.jpg' },
  { title: 'Healthcare', image: '/images/clinic-consult.jpg' },
  { title: 'Engineering', image: '/images/construction.jpg' },
  { title: 'Hospitality', image: '/images/hospitality.jpg' },
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
        image="/images/graduate.jpg"
        imageAlt="A graduate in cap and gown in Nairobi"
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
                <Photo src={field.image} alt="" sizes="(max-width: 720px) 100vw, 380px" />
                <span>{field.title}</span>
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
              <Photo src="/images/interview-table.jpg" alt="Two professionals in conversation at an interview table" />
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
              <Photo src="/images/portrait.jpg" alt="Portrait of a smiling African professional" />
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
