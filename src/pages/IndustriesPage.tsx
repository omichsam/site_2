import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import { ArrowRightIcon, CheckIcon, PinIcon } from '../components/icons'
import { industries } from '../content/industries'
import { services } from '../content/services'
import Photo from '../components/Photo'

const serviceSlug = (title: string) => services.find((s) => s.title === title)?.slug

export default function IndustriesPage() {

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'Industries' }]}
        eyebrow="Industries"
        title="Supporting organisations across diverse industries."
        lede="Each sector runs on different shifts, sites, procedures and funding cycles. Our support follows the way your sector actually works."
        image="/images/meeting-room.jpg"
        imageAlt="A team meeting around a table in a bright meeting room"
        badge={{ icon: <PinIcon size={18} />, title: 'Eight sectors', detail: 'Public, private and non-profit' }}
      />

      {/* Jump grid */}
      <section className={styles.section} style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div className={`${styles.wrap} ${styles.sectorJump}`}>
          {industries.map((industry) => (
            <a key={industry.slug} href={`#${industry.slug}`} className={styles.sectorJumpItem}>
              <Photo src={industry.image} alt="" sizes="(max-width: 560px) 45vw, 140px" />
              <span>{industry.title}</span>
            </a>
          ))}
        </div>
      </section>

      {industries.map((industry, i) => (
        <section key={industry.slug} id={industry.slug} className={`${styles.section} ${i % 2 === 0 ? styles.sectionAlt : ''}`}>
          <div className={styles.wrap}>
            <Reveal className={`${styles.industryRow} ${i % 2 ? styles.industryRowFlip : ''}`}>
              <div className={styles.industryPhoto}>
                <Photo src={industry.image} alt={industry.imageAlt} />
                <span className={styles.industryPhotoNum}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <div className={styles.eyebrow}>Sector {String(i + 1).padStart(2, '0')}</div>
                <h2 className={styles.industryTitle}>{industry.title}</h2>
                <p className={styles.workforceLede}>{industry.introduction}</p>
                <h3 className={styles.miniHead}>Common workforce challenges</h3>
                <ul className={styles.checkGrid}>
                  {industry.challenges.map((challenge) => (
                    <li key={challenge}><CheckIcon size={16} /> {challenge}</li>
                  ))}
                </ul>
                <h3 className={styles.miniHead}>Services that help</h3>
                <div className={styles.industryChips}>
                  {industry.services.map((title) => (
                    <Link key={title} to={`/services/${serviceSlug(title) ?? ''}`} className={styles.industryChip}>{title}</Link>
                  ))}
                </div>
                <p className={styles.supportNote}>{industry.support}</p>
                <Link to="/contact?enquiry=consultation" className={styles.workforceLink}>
                  Discuss your sector <ArrowRightIcon />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </Layout>
  )
}
