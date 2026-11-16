import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import ServiceGlyph from '../components/ServiceGlyph'
import { ArrowRightIcon, CheckIcon } from '../components/icons'
import { entryPoints, pillars, pillarServices } from '../content/pillars'
import { process } from '../content/company'
import Photo from '../components/Photo'

export default function ServicesPage() {

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'Our Services' }]}
        eyebrow="Our Services"
        title="Hire Kenyan talent. Build your team. Support your growth."
        lede="Avenyra Global helps international businesses access Kenyan talent and establish the workforce support needed to grow. From recruiting individual professionals to building dedicated remote teams, we bring together talent acquisition, employment coordination, HR operations and workforce technology."
        image="/images/women-team.jpg"
        imageAlt="A team of professionals standing together in their office"
        badge={{ icon: <CheckIcon />, title: 'Four pillars', detail: 'Engage one, or combine them' }}
      />

      {/* Three common starting points, then the four pillars */}
      <section className={styles.section} style={{ paddingTop: 56 }}>
        <div className={styles.wrap}>
          <nav className={styles.entryLinks} aria-label="Where to start">
            {entryPoints.map((entry) => (
              <Link key={entry.to} to={entry.to} className={styles.entryLink}>
                <span className={styles.entryLinkIcon}><ServiceGlyph name={entry.icon} /></span>
                <span>
                  <b>{entry.title}</b>
                  <small>{entry.detail}</small>
                </span>
                <ArrowRightIcon />
              </Link>
            ))}
          </nav>

          <p className={styles.pillarNote}>Our four service pillars can be engaged individually or combined around your business needs.</p>
          <div className={styles.serviceIndex}>
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 80}>
                <a href={`#${pillar.slug}`} className={styles.serviceIndexCard}>
                  <span className={styles.serviceIndexIcon}><ServiceGlyph name={pillar.icon} /></span>
                  <span className={styles.serviceIndexNum}>{String(i + 1).padStart(2, '0')}</span>
                  <b>{pillar.title}</b>
                  <small>{pillar.summary}</small>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Each pillar as an alternating photo and text row */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          {pillars.map((pillar, i) => {
            const related = pillarServices(pillar)
            return (
              <Reveal key={pillar.slug} id={pillar.slug} className={`${styles.zigzag} ${i % 2 ? styles.zigzagFlip : ''}`}>
                <div className={styles.zigzagMedia}>
                  <Photo src={pillar.image} className={styles.zigzagMain} alt={pillar.imageAlt} />
                  <Photo src={pillar.image2} className={styles.zigzagInset} alt={pillar.image2Alt} sizes="240px" />
                </div>
                <div className={styles.zigzagText}>
                  <span className={styles.solutionEyebrowDark}>
                    {String(i + 1).padStart(2, '0')} · {pillar.title}
                  </span>
                  <h2>{pillar.headline}</h2>
                  <p>{pillar.intro}</p>
                  <ul className={styles.checkList}>
                    {pillar.includes.map((item) => (
                      <li key={item}><CheckIcon size={16} /> {item}</li>
                    ))}
                  </ul>
                  <p className={styles.idealFor}><b>Ideal for:</b> {pillar.idealFor}</p>
                  {related.length > 0 && (
                    <p className={styles.pillarServices}>
                      <span>Services:</span>
                      {related.map((service) => (
                        <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>
                      ))}
                    </p>
                  )}
                  <Link to={`/services/${pillar.slug}`} className={styles.workforceLink}>
                    Explore {pillar.title} <ArrowRightIcon />
                  </Link>
                </div>
              </Reveal>
            )
          })}
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
