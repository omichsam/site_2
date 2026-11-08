import styles from '../styles/site.module.css'
import Photo from './Photo'

const PHOTOS: { src: string; label: string }[] = [
  { src: '/images/interview-table.jpg', label: 'Recruitment' },
  { src: '/images/payroll-laptop.jpg', label: 'Payroll' },
  { src: '/images/training-session.jpg', label: 'Training' },
  { src: '/images/hospital-care.jpg', label: 'Healthcare' },
  { src: '/images/construction.jpg', label: 'Construction' },
  { src: '/images/open-office.jpg', label: 'Temporary staffing' },
  { src: '/images/factory.jpg', label: 'Manufacturing' },
  { src: '/images/advisory.jpg', label: 'HR advisory' },
  { src: '/images/hospitality.jpg', label: 'Hospitality' },
  { src: '/images/team-computers.jpg', label: 'NGOs' },
]

// A slow, continuous ribbon of workforce photos. The list is rendered twice
// so the loop is seamless; it pauses on hover and stops for reduced motion.
export default function PhotoMarquee() {
  return (
    <div className={styles.marquee} aria-label="The people and sectors we support">
      <div className={styles.marqueeTrack}>
        {[...PHOTOS, ...PHOTOS].map((photo, i) => (
          <figure key={i} className={styles.marqueeItem} aria-hidden={i >= PHOTOS.length}>
            <Photo src={photo.src} alt="" sizes="260px" />
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
