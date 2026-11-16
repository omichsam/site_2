import { Link, Navigate, useParams } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import ServiceGlyph from '../components/ServiceGlyph'
import { ArrowRightIcon, CheckIcon, CompassIcon } from '../components/icons'
import { getService } from '../content/services'
import { getPillar, pillarOf, pillars, pillarServices, type Pillar } from '../content/pillars'
import { industries } from '../content/industries'
import Photo from '../components/Photo'

// /services/:slug shows either one of the four pillars or one of the
// supporting services beneath them. Both use the same page layout.
export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const pillar = getPillar(slug)
  if (pillar) return <PillarView pillar={pillar} />
  if (getService(slug)) return <ServiceView slug={slug} />
  return <Navigate to="/services" replace />
}

type Card = { slug: string; title: string; image: string }

function MoreCards({ eyebrow, title, items }: { eyebrow: string; title: string; items: Card[] }) {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
          <div>
            <div className={styles.eyebrow}>{eyebrow}</div>
            <h2>{title}</h2>
          </div>
        </Reveal>
        <div className={styles.miniCards}>
          {items.map((item) => (
            <Link key={item.slug} to={`/services/${item.slug}`} className={styles.miniCard}>
              <Photo src={item.image} alt="" sizes="80px" />
              <span>
                <b>{item.title}</b>
                <small>Learn more <ArrowRightIcon size={13} /></small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarView({ pillar }: { pillar: Pillar }) {
  const index = pillars.indexOf(pillar)
  const related = pillarServices(pillar)
  const others = pillars.filter((p) => p.slug !== pillar.slug)

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'Our Services', to: '/services' }, { label: pillar.title }]}
        eyebrow={`${String(index + 1).padStart(2, '0')} · Service Pillar`}
        title={pillar.title}
        lede={pillar.summary}
        image={pillar.image}
        imageAlt={pillar.imageAlt}
        badge={{ icon: <ServiceGlyph name={pillar.icon} />, title: pillar.title, detail: 'Scoped and agreed in writing' }}
      >
        <div className={styles.heroCtas}>
          <Link to={`/contact?enquiry=service&solution=${pillar.slug}`} className={`${styles.btn} ${styles.btnPrimary}`}>
            Discuss This Solution
          </Link>
          <Link to="/services" className={`${styles.btn} ${styles.btnGhost}`}>All Solutions <ArrowRightIcon /></Link>
        </div>
      </PageHero>

      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.workforceSplit}`}>
          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Overview</div>
            <h2>{pillar.headline}</h2>
            <p className={styles.workforceLede}>{pillar.intro}</p>
          </Reveal>
          <Reveal className={styles.workforceMedia}>
            <div className={styles.workforcePhoto}>
              <Photo src={pillar.image2} alt={pillar.image2Alt} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.wrap} ${styles.twoCards}`}>
          <Reveal className={styles.infoCard}>
            <span className={styles.infoCardIcon}><ServiceGlyph name={pillar.icon} /></span>
            <h2>Our services include</h2>
            <ol className={styles.numberList}>
              {pillar.includes.map((item, i) => (
                <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal className={`${styles.infoCard} ${styles.infoCardDark}`} delay={120}>
            <span className={styles.infoCardIcon}><CheckIcon /></span>
            <h2>Ideal for</h2>
            <p>{pillar.idealFor}</p>
            {related.length > 0 && (
              <ul className={styles.checkList}>
                {related.map((service) => (
                  <li key={service.slug}>
                    <CheckIcon size={16} /> <Link to={`/services/${service.slug}`}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <MoreCards eyebrow="Services in this pillar" title="Commission one service, or the whole pillar." items={related} />
      ) : (
        <MoreCards eyebrow="Other Solutions" title="Combine pillars into one managed programme." items={others} />
      )}
    </Layout>
  )
}

function ServiceView({ slug }: { slug: string }) {
  const service = getService(slug)!
  const pillar = pillarOf(service.slug)
  const sectors = industries.filter((industry) => industry.services.includes(service.title))
  const siblings = pillar ? pillarServices(pillar).filter((s) => s.slug !== service.slug) : []

  return (
    <Layout>
      <PageHero
        crumbs={[
          { label: 'Our Services', to: '/services' },
          ...(pillar ? [{ label: pillar.title, to: `/services/${pillar.slug}` }] : []),
          { label: service.title },
        ]}
        eyebrow={pillar ? pillar.title : 'Our Services'}
        title={service.title}
        lede={service.introduction}
        image={service.image}
        imageAlt={service.imageAlt}
        badge={{ icon: <ServiceGlyph name={service.icon} />, title: service.title, detail: 'Scoped and agreed in writing' }}
      >
        <div className={styles.heroCtas}>
          <Link
            to={`/contact?enquiry=service${pillar ? `&solution=${pillar.slug}` : ''}`}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Discuss This Service
          </Link>
          {pillar && (
            <Link to={`/services/${pillar.slug}`} className={`${styles.btn} ${styles.btnGhost}`}>
              {pillar.title} <ArrowRightIcon />
            </Link>
          )}
        </div>
      </PageHero>

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

      {siblings.length > 0 ? (
        <MoreCards eyebrow={`More in ${pillar!.title}`} title="Combine services into one managed programme." items={siblings} />
      ) : (
        <MoreCards eyebrow="Service Pillars" title="Explore the wider workforce support." items={pillars.filter((p) => p.slug !== pillar?.slug)} />
      )}
    </Layout>
  )
}
