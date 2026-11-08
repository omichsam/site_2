import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import EnquiryForm from '../components/EnquiryForm'
import { EnvelopeIcon, PhoneIcon, PinIcon } from '../components/icons'
import { CONTACT } from '../content/company'
import Photo from '../components/Photo'

const TYPE_FROM_QUERY: Record<string, string> = {
  consultation: 'Request a consultation',
  service: 'Service enquiry',
  partnership: 'Partnership',
  careers: 'Careers',
}

export default function ContactPage() {
  const [params] = useSearchParams()
  // Read after load: the prerendered page has no query string, so choosing the
  // enquiry type during the first render would not match the HTML.
  const [defaultType, setDefaultType] = useState<string | undefined>()
  useEffect(() => setDefaultType(TYPE_FROM_QUERY[params.get('enquiry') ?? '']), [params])

  return (
    <Layout>
      <section className={styles.contactHero}>
        <Photo src="/images/nairobi-skyline.jpg" alt="" priority sizes="100vw" />
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
              <Photo src="/images/laptop-discussion.jpg" alt="Two colleagues discussing work over a laptop" />
            </div>
          </Reveal>
          <div className={styles.contactFormCard}>
            <h2 className={styles.formTitle}>Send an enquiry</h2>
            <EnquiryForm key={defaultType ?? 'none'} kind="enquiry" defaultType={defaultType} />
          </div>
        </div>
      </section>
    </Layout>
  )
}
