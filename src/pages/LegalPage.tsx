import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import { CONTACT } from '../content/company'

const DOCS = {
  privacy: {
    eyebrow: 'Privacy',
    title: 'Privacy Policy',
    description: 'How Avenyra Global handles enquiries, candidate details and CVs submitted through this website.',
    paragraphs: [
      'Avenyra Global (“we”) collects the details you choose to submit through the contact form or the CV form. That may include your name, email address, telephone number, organisation, enquiry, and, for candidates, your location, qualification, experience, employment preference and CV.',
      'We use contact enquiries to respond to organisations and individuals. We use candidate information only for recruitment follow-up. CVs are kept private. They are not published, indexed, or shown on any public page.',
      'Do not send information you are not comfortable sharing for that purpose. You may ask us to correct or delete an enquiry or a CV by writing to us and stating that your message is a privacy request, including the email address you used originally.',
      'Data is kept for operational follow-up, and access to enquiries and CVs is limited to the people who handle them.',
      'This website does not sell personal information. It does not place advertising trackers. The forms on this website prepare an email on your own device; nothing is sent until you choose to send it.',
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Terms & Conditions',
    description: 'The terms that apply to using the Avenyra Global website.',
    paragraphs: [
      'This website introduces Avenyra Global and provides a way to send an enquiry or a CV. It is not an offer of employment, and it is not a contract for services. A service begins only when the scope has been agreed separately.',
      'Content is provided in good faith. Do not rely on general information on this website as advice for a specific situation.',
      'Vacancies appear only when they are approved for publication. An empty careers list means there is nothing approved at that moment. Submitting a CV does not create an obligation to consider you for a particular role.',
      'You agree not to send unlawful material, malware, or a CV that is not yours to share. You are responsible for the accuracy of what you submit.',
      'These terms will be reviewed by the company’s legal advisers before they are treated as a final legal text.',
    ],
  },
}

export default function LegalPage({ doc }: { doc: keyof typeof DOCS }) {
  const page = DOCS[doc]

  return (
    <Layout>
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.legal}`}>
          <div className={styles.eyebrow}>{page.eyebrow}</div>
          <h1>{page.title}</h1>
          {page.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <p>Questions can be sent to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
          <nav className={styles.legalNav}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>
      </section>
    </Layout>
  )
}
