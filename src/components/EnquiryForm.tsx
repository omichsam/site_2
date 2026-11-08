import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import { CONTACT, enquiryTypes } from '../content/company'
import { services } from '../content/services'

type Field = { label: string; name: string; type?: string; required?: boolean; options?: readonly string[]; wide?: boolean; rows?: number }

const FORMS: Record<'enquiry' | 'cv', { subject: (data: FormData) => string; fields: Field[]; button: string; note: string }> = {
  enquiry: {
    subject: (data) => `${data.get('enquiryType') || 'Enquiry'} from ${data.get('organisation') || data.get('fullName')}`,
    button: 'Prepare email enquiry',
    note: 'This form prepares an email on your device. Nothing is sent until you choose to send it.',
    fields: [
      { label: 'Full name', name: 'fullName', required: true },
      { label: 'Email address', name: 'email', type: 'email', required: true },
      { label: 'Telephone', name: 'phone', type: 'tel' },
      { label: 'Organisation', name: 'organisation' },
      { label: 'Enquiry type', name: 'enquiryType', options: enquiryTypes },
      { label: 'Service of interest', name: 'service', options: [...services.map((s) => s.title), 'Not sure yet'] },
      { label: 'How can we help?', name: 'message', wide: true, rows: 5, required: true },
    ],
  },
  cv: {
    subject: (data) => `CV registration: ${data.get('fullName')} (${data.get('category') || 'General'})`,
    button: 'Prepare CV email',
    note: 'Your email app opens with these details filled in. Attach your CV (PDF or DOCX) before sending.',
    fields: [
      { label: 'Full name', name: 'fullName', required: true },
      { label: 'Email address', name: 'email', type: 'email', required: true },
      { label: 'Telephone', name: 'phone', type: 'tel' },
      { label: 'Location', name: 'location' },
      { label: 'Career field', name: 'category', options: ['Human Resources', 'Finance & Payroll', 'Administration', 'Healthcare', 'Engineering', 'Hospitality', 'General'] },
      { label: 'Preferred employment type', name: 'employmentType', options: ['Permanent', 'Contract', 'Temporary', 'Internship'] },
      { label: 'Highest qualification', name: 'qualification', options: ['Secondary education', 'Certificate', 'Diploma', 'Bachelor’s degree', 'Postgraduate degree', 'Other'] },
      { label: 'Years of experience', name: 'experience', options: ['Less than 1 year', '1 to 3 years', '4 to 7 years', '8 to 12 years', 'More than 12 years'] },
      { label: 'A short note about the work you are looking for', name: 'message', wide: true, rows: 4 },
    ],
  },
}

// Enquiry and CV forms. With no backend yet, both open a pre-filled email
// draft addressed to Avenyra Global.
export default function EnquiryForm({ kind = 'enquiry', defaultType }: { kind?: 'enquiry' | 'cv'; defaultType?: string }) {
  const config = FORMS[kind]
  const [mailto, setMailto] = useState<string | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = config.fields.map((f) => `${f.label}: ${data.get(f.name) || 'Not provided'}`).join('\n')
    const link = `mailto:${CONTACT.email}?subject=${encodeURIComponent(config.subject(data))}&body=${encodeURIComponent(body)}`
    setMailto(link)
    window.location.href = link
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {mailto && (
        <div className={styles.formNotice} role="status">
          <strong>Almost done. Please send the email draft.</strong>
          <span>Your email app should have opened with your details filled in{kind === 'cv' ? '. Remember to attach your CV' : ''}.</span>
          <a href={mailto}>Open the email draft again</a>
        </div>
      )}
      <div className={styles.formGrid}>
        {config.fields.map((field) => (
          <label key={field.name} className={`${styles.formField} ${field.wide ? styles.formFieldWide : ''}`}>
            <span>{field.label}{field.required ? ' *' : ''}</span>
            {field.options ? (
              <select name={field.name} defaultValue={field.name === 'enquiryType' && defaultType ? defaultType : ''}>
                <option value="">Select</option>
                {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : field.rows ? (
              <textarea name={field.name} rows={field.rows} required={field.required} />
            ) : (
              <input name={field.name} type={field.type ?? 'text'} required={field.required} />
            )}
          </label>
        ))}
      </div>
      <label className={styles.consentField}>
        <input type="checkbox" required />
        <span>
          I agree to Avenyra Global using these details to respond, as described in the{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>{config.button}</button>
      <p className={styles.formFootnote}>{config.note}</p>
    </form>
  )
}
