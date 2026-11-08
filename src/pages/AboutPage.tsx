import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import { ArrowRightIcon, CheckIcon, CompassIcon, PinIcon, TeamIcon } from '../components/icons'
import { company, principles, values } from '../content/company'
import { asset } from '../lib/asset'
import { usePageMeta } from '../lib/usePageMeta'

const GALLERY = [
  { src: '/images/boardroom.jpg', alt: 'A boardroom planning session', cls: 'galleryWide' },
  { src: '/images/portrait.jpg', alt: 'Portrait of a smiling African professional', cls: 'galleryTall' },
  { src: '/images/training-session.jpg', alt: 'A facilitator presenting to colleagues', cls: '' },
  { src: '/images/factory.jpg', alt: 'A production worker on a factory floor', cls: '' },
  { src: '/images/hospitality.jpg', alt: 'Two cafe staff behind the counter', cls: '' },
  { src: '/images/advisory.jpg', alt: 'Two colleagues talking beside an office window', cls: '' },
]

export default function AboutPage() {
  usePageMeta('About Us', 'Avenyra Global is a people-centred human resource outsourcing, recruitment and workforce solutions company.')

  return (
    <Layout>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About Avenyra Global"
        title="A people-centred workforce partner."
        lede="Avenyra Global works with organisations that need practical human resource support, and with people looking for work that suits their skills."
        image="/images/colleagues.jpg"
        imageAlt="Three colleagues talking around a meeting table"
        badge={{ icon: <PinIcon size={18} />, title: 'Based in Nairobi', detail: 'Serving Kenya and beyond' }}
      />

      {/* Who we are */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.workforceSplit}`}>
          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Who We Are</div>
            <h2>Flexible, dependable HR support.</h2>
            <p className={styles.workforceLede}>
              People are the foundation of every successful organisation. Managing a workforce requires more than
              filling positions; it requires the right people, effective processes and professional human resource
              support.
            </p>
            <p className={styles.workforceLede}>{company.description}</p>
          </Reveal>
          <Reveal className={styles.collage}>
            <img className={styles.collageA} src={asset('/images/small-team.jpg')} alt="A small team meeting in a modern office" loading="lazy" />
            <img className={styles.collageB} src={asset('/images/professional.jpg')} alt="An African professional seated by an office window" loading="lazy" />
            <img className={styles.collageC} src={asset('/images/hr-laptop.jpg')} alt="An HR professional working on a laptop" loading="lazy" />
            <span className={styles.collageBadge}><TeamIcon /> {company.tagline}</span>
          </Reveal>
        </div>
      </section>

      {/* Vision and mission */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.wrap} ${styles.twoCards}`}>
          <Reveal className={`${styles.infoCard} ${styles.infoCardPhoto}`}>
            <img src={asset('/images/panel-meeting.jpg')} alt="" loading="lazy" />
            <span className={styles.solutionEyebrowDark}>Our Vision</span>
            <h2>Workplaces where people can do good work.</h2>
            <p>
              Organisations in which people are supported properly, and workforce decisions are made with care,
              clarity and a record that stands up to review.
            </p>
          </Reveal>
          <Reveal className={`${styles.infoCard} ${styles.infoCardDark} ${styles.infoCardPhoto}`} delay={120}>
            <img src={asset('/images/handshake.jpg')} alt="" loading="lazy" />
            <span className={styles.solutionEyebrow}>Our Mission</span>
            <h2>Practical support for people and organisations.</h2>
            <p>
              To provide human resource outsourcing, recruitment and workforce solutions that help organisations
              attract capable people, manage them well and pursue their objectives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
            <div>
              <div className={styles.eyebrow}>Our Core Values</div>
              <h2>Six values behind every engagement.</h2>
            </div>
            <p>How clients, candidates and employees should experience working with us.</p>
          </Reveal>
          <div className={styles.valueGrid}>
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 100} className={styles.valueCard}>
                <span className={styles.whyItemNum}>0{i + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.wrap} ${styles.workforceSplit}`}>
          <Reveal className={styles.workforceMedia}>
            <div className={styles.workforcePhoto}>
              <img src={asset('/images/nairobi-office.jpg')} alt="A professional working at a laptop in a Nairobi office" loading="lazy" />
            </div>
            <div className={styles.workforceBadge}>
              <span className={styles.workforceBadgeIcon}><CheckIcon /></span>
              <span>
                <b>Agreed scope</b>
                <small>Written down before work starts</small>
              </span>
            </div>
          </Reveal>
          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Our Commitment</div>
            <h2>A professional service approach.</h2>
            <p className={styles.workforceLede}>
              An agreed scope, respectful treatment of candidates and employees, and communication that a client can
              follow.
            </p>
            <ul className={styles.workforceList}>
              {principles.map((item, i) => (
                <li key={item.title}>
                  <span className={styles.workforceListIcon}>{[<TeamIcon key="a" />, <CompassIcon key="b" />, <CheckIcon key="c" />][i]}</span>
                  <span>
                    <b>{item.title}</b>
                    <span>{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className={styles.workforceLink}>Talk to our team <ArrowRightIcon /></Link>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <Reveal className={styles.secHead}>
            <div className={styles.eyebrow}>People at Work</div>
            <h2>The workplaces we support.</h2>
          </Reveal>
          <Reveal className={styles.gallery}>
            {GALLERY.map((photo) => (
              <figure key={photo.src} className={photo.cls ? styles[photo.cls] : undefined}>
                <img src={asset(photo.src)} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
