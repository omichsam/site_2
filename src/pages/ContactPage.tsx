import { useSearchParams } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import EnquiryForm from '../components/EnquiryForm'
import { EnvelopeIcon, PhoneIcon, PinIcon } from '../components/icons'
import { CONTACT } from '../content/company'
import { asset } from '../lib/asset'
import { usePageMeta } from '../lib/usePageMeta'

const TYPE_FROM_QUERY: Record<string, string> = {
  consultation: 'Request a consultation',
  service: 'Service enquiry',
  partnership: 'Partnership',
  careers: 'Careers',
}

export default function ContactPage() {
  usePageMeta('Contact Us', 'Start a conversation with Avenyra Global about human resource and recruitment support.')
  const [params] = useSearchParams()
  const defaultType = TYPE_FROM_QUERY[params.get('enquiry') ?? '']

  return (
    <Layout>
      <section className={styles.contactHero}>
        <img src={asset('/images/nairobi-skyline.jpg')} alt="" />
        <div className={styles.wrap}>
          <div className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Contact</div>
          <h1>Let&rsquo;s start a conversation.</h1>
          <p>Tell us about the workforce support you need. We will reply to the email address you provide.</p>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className={`${styles.wrap} ${styles.contactGrid}`}>
          <Reveal className={styles.contactIntro}>
            <div className={styles.eyebrow}>Get in Touch</div>
            <h2>Talk to our Nairobi team.</h2>
            <p className={styles.contactLede}>
              Whether you need one role filled or a full people function, start with a short conversation about
              your organisation and the support it needs.
            </p>
            <ul className={styles.contactChips}>
              <li><a href={`mailto:${CONTACT.email}`}><EnvelopeIcon /> {CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}><PhoneIcon /> {CONTACT.phone}</a></li>
              <li><span><PinIcon /> {CONTACT.location}</span></li>
            </ul>
            <div className={styles.contactPhoto}>
              <img src={asset('/images/consultation.jpg')} alt="An African professional listening during a consultation" loading="lazy" />
            </div>
          </Reveal>
          <div className={styles.contactFormCard}>
            <h2 className={styles.formTitle}>Send an enquiry</h2>
            <EnquiryForm kind="enquiry" defaultType={defaultType} />
          </div>
        </div>
      </section>
    </Layout>
  )
}
