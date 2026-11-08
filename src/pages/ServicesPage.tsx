import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import ServiceGlyph from '../components/ServiceGlyph'
import { SERVICE_AREA } from '../components/ServicesTabs'
import { ArrowRightIcon, CheckIcon } from '../components/icons'
import { services } from '../content/services'
import { process } from '../content/company'
import { asset } from '../lib/asset'
import { usePageMeta } from '../lib/usePageMeta'

export default function ServicesPage() {
  usePageMeta('Our Services', 'HR outsourcing, recruitment, payroll, contract workforce management, training, HR advisory, temporary staffing and benefits administration.')

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'Our Services' }]}
        eyebrow="Our Services"
        title="Comprehensive human resource solutions."
        lede="From finding the right talent to managing everyday workforce requirements, Avenyra Global provides a range of HR services designed to support organisations at different stages of growth."
        image="/images/flipchart-workshop.jpg"
        imageAlt="An African facilitator leading a workshop at a flipchart"
        badge={{ icon: <CheckIcon />, title: 'Eight services', detail: 'Commission one, or combine them' }}
      />

      {/* Quick index of all eight */}
      <section className={styles.section} style={{ paddingTop: 56 }}>
        <div className={styles.wrap}>
          <div className={styles.serviceIndex}>
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 4) * 80}>
                <a href={`#${service.slug}`} className={styles.serviceIndexCard}>
                  <span className={styles.serviceIndexIcon}><ServiceGlyph name={service.icon} /></span>
                  <span className={styles.serviceIndexNum}>{String(i + 1).padStart(2, '0')}</span>
                  <b>{service.title}</b>
                  <small>{service.summary}</small>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Each service as an alternating photo and text row */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          {services.map((service, i) => (
            <Reveal key={service.slug} id={service.slug} className={`${styles.zigzag} ${i % 2 ? styles.zigzagFlip : ''}`}>
              <div className={styles.zigzagMedia}>
                <img className={styles.zigzagMain} src={asset(service.image)} alt={service.imageAlt} loading="lazy" />
                <img className={styles.zigzagInset} src={asset(service.image2)} alt={service.image2Alt} loading="lazy" />
              </div>
              <div className={styles.zigzagText}>
                <span className={styles.solutionEyebrowDark}>
                  {String(i + 1).padStart(2, '0')} · {SERVICE_AREA[service.icon]}
                </span>
                <h2>{service.title}</h2>
                <p>{service.introduction}</p>
                <ul className={styles.checkList}>
                  {service.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit}><CheckIcon size={16} /> {benefit}</li>
                  ))}
                </ul>
                <Link to={`/services/${service.slug}`} className={styles.workforceLink}>
                  Explore {service.title} <ArrowRightIcon />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.processBand}>
        <div className={styles.wrap}>
          <Reveal className={styles.processHead}>
            <div>
              <div className={`${styles.eyebrow} ${styles.eyebrowLight}`}>How Every Engagement Runs</div>
              <h2>Understand, plan, deliver, support.</h2>
            </div>
            <p>Each assignment has an agreed scope, a reporting rhythm and a named point of contact.</p>
          </Reveal>
          <Reveal className={styles.timeline}>
            <div className={styles.timelineTrack} aria-hidden="true" />
            <ol className={styles.timelineSteps}>
              {process.map((step) => (
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
    </Layout>
  )
}
