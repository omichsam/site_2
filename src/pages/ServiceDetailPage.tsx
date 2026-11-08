import { Link, Navigate, useParams } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import ServiceGlyph from '../components/ServiceGlyph'
import { SERVICE_AREA } from '../components/ServicesTabs'
import { ArrowRightIcon, CheckIcon, CompassIcon } from '../components/icons'
import { getService, services } from '../content/services'
import { industries } from '../content/industries'
import Photo from '../components/Photo'

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = getService(slug)
  if (!service) return <Navigate to="/services" replace />

  const index = services.indexOf(service)
  const sectors = industries.filter((industry) => industry.services.includes(service.title))
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'Our Services', to: '/services' }, { label: service.title }]}
        eyebrow={`${String(index + 1).padStart(2, '0')} · ${SERVICE_AREA[service.icon]}`}
        title={service.title}
        lede={service.introduction}
        image={service.image}
        imageAlt={service.imageAlt}
        badge={{ icon: <ServiceGlyph name={service.icon} />, title: service.title, detail: 'Scoped and agreed in writing' }}
      >
        <div className={styles.heroCtas}>
          <Link to={`/contact?enquiry=service&service=${service.slug}`} className={`${styles.btn} ${styles.btnPrimary}`}>
            Discuss This Service
          </Link>
          <Link to="/services" className={`${styles.btn} ${styles.btnGhost}`}>All Services <ArrowRightIcon /></Link>
        </div>
      </PageHero>

      {/* Overview with second photo */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.workforceSplit}`}>
          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Overview</div>
            <h2>What the service covers.</h2>
            <p className={styles.workforceLede}>{service.description}</p>
          </Reveal>
          <Reveal className={styles.workforceMedia}>
            <div className={styles.workforcePhoto}>
              <Photo src={service.image2} alt={service.image2Alt} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Activities and benefits */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.wrap} ${styles.twoCards}`}>
          <Reveal className={styles.infoCard}>
            <span className={styles.infoCardIcon}><ServiceGlyph name={service.icon} /></span>
            <h2>Typical activities</h2>
            <ol className={styles.numberList}>
              {service.activities.map((activity, i) => (
                <li key={activity}><span>{String(i + 1).padStart(2, '0')}</span>{activity}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal className={`${styles.infoCard} ${styles.infoCardDark}`} delay={120}>
            <span className={styles.infoCardIcon}><CheckIcon /></span>
            <h2>What it changes for you</h2>
            <ul className={styles.checkList}>
              {service.benefits.map((benefit) => (
                <li key={benefit}><CheckIcon size={16} /> {benefit}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How it is delivered + sectors */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.deliveryRow}`}>
          <Reveal className={styles.deliveryNote}>
            <span className={styles.workforceListIcon}><CompassIcon /></span>
            <div>
              <h2>How it is delivered</h2>
              <p>{service.delivery}</p>
            </div>
          </Reveal>
          {sectors.length > 0 && (
            <Reveal className={styles.sectorStack}>
              <div className={styles.eyebrow}>Often used in</div>
              <div className={styles.sectorThumbs}>
                {sectors.map((sector) => (
                  <Link key={sector.slug} to={`/industries#${sector.slug}`} className={styles.sectorThumb}>
                    <Photo src={sector.image} alt="" sizes="260px" />
                    <span>{sector.title}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Other services */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
            <div>
              <div className={styles.eyebrow}>Other Services</div>
              <h2>Combine services into one managed programme.</h2>
            </div>
          </Reveal>
          <div className={styles.miniCards}>
            {others.map((other) => (
              <Link key={other.slug} to={`/services/${other.slug}`} className={styles.miniCard}>
                <Photo src={other.image} alt="" sizes="80px" />
                <span>
                  <b>{other.title}</b>
                  <small>Learn more <ArrowRightIcon size={13} /></small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
