import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import { ArrowRightIcon, CheckIcon, CompassIcon, PinIcon, TeamIcon } from '../components/icons'
import { company, principles, values } from '../content/company'
import Photo from '../components/Photo'

export default function AboutPage() {

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
            <Photo src="/images/small-team.jpg" className={styles.collageA} alt="A small team meeting in a modern office" sizes="(max-width: 980px) 50vw, 320px" />
            <Photo src="/images/reading-group.jpg" className={styles.collageB} alt="Three colleagues reading through documents together" sizes="(max-width: 980px) 50vw, 320px" />
            <Photo src="/images/laptop-lounge.jpg" className={styles.collageC} alt="A professional working on a laptop in a lounge" sizes="(max-width: 980px) 50vw, 320px" />
            <span className={styles.collageBadge}><TeamIcon /> {company.tagline}</span>
          </Reveal>
        </div>
      </section>

      {/* Vision and mission */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.wrap} ${styles.twoCards}`}>
          <Reveal className={`${styles.infoCard} ${styles.infoCardPhoto}`}>
            <Photo src="/images/cafe-reading.jpg" alt="" sizes="(max-width: 980px) 100vw, 560px" />
            <span className={styles.solutionEyebrowDark}>Our Vision</span>
            <h2>Workplaces where people can do good work.</h2>
            <p>
              Organisations in which people are supported properly, and workforce decisions are made with care,
              clarity and a record that stands up to review.
            </p>
          </Reveal>
          <Reveal className={`${styles.infoCard} ${styles.infoCardDark} ${styles.infoCardPhoto}`} delay={120}>
            <Photo src="/images/team-standing.jpg" alt="" sizes="(max-width: 980px) 100vw, 560px" />
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
              <Photo src="/images/sofa-laptop.jpg" alt="A professional working on her laptop on an office sofa" />
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

    </Layout>
  )
}
