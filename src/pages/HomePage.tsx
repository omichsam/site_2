import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import HeroShowcase from '../components/HeroShowcase'
import ServicesTabs from '../components/ServicesTabs'
import PhotoMarquee from '../components/PhotoMarquee'
import { ArrowRightIcon, CheckIcon, CompassIcon, PinIcon, TeamIcon } from '../components/icons'
import { company, differentiators, principles, process } from '../content/company'
import { industries } from '../content/industries'
import { articles } from '../content/insights'
import { longDate } from '../lib/format'
import Photo, { photoUrl } from '../components/Photo'

const PRINCIPLE_ICONS = [<TeamIcon key="t" />, <CompassIcon key="c" />, <CheckIcon key="k" />]

const FACES = [
  { src: '/images/portrait.jpg', pos: '50% 18%' },
  { src: '/images/professional.jpg', pos: '50% 12%' },
  { src: '/images/graduate.jpg', pos: '50% 22%' },
  { src: '/images/consultation.jpg', pos: '30% 20%' },
]

export default function HomePage() {

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>{company.eyebrow}</div>
            <h1>Empowering people. Strengthening organisations.</h1>
            <p className={styles.lede}>{company.hero}</p>
            <div className={styles.heroCtas}>
              <Link to="/contact?enquiry=consultation" className={`${styles.btn} ${styles.btnPrimary}`}>
                Partner With Us
              </Link>
              <Link to="/services" className={`${styles.btn} ${styles.btnGhost}`}>
                Explore Our Services <ArrowRightIcon />
              </Link>
            </div>
            <div className={styles.heroPeople}>
              <span className={styles.faces} aria-hidden="true">
                {FACES.map((face) => (
                  <img key={face.src} src={photoUrl(face.src, 480)} alt="" width={40} height={40} style={{ objectPosition: face.pos }} />
                ))}
              </span>
              <span>
                Serving businesses, institutions, NGOs <br className={styles.brWide} />and people seeking work.
              </span>
            </div>
          </div>
          <HeroShowcase />
        </div>
      </section>

      {/* ================= STRIP ================= */}
      <div className={styles.strip}>
        <div className={styles.wrap}>
          <span className={styles.stripLabel}>{company.tagline}</span>
          <div className={styles.stripItems}>
            {['HR Outsourcing', 'Recruitment', 'Payroll Management', 'Workforce Solutions'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BETTER WORKPLACES ================= */}
      <section className={styles.section} style={{ paddingTop: 88 }}>
        <div className={`${styles.wrap} ${styles.workforceSplit}`}>
          <Reveal className={styles.workforceMedia}>
            <div className={styles.workforcePhoto}>
              <Photo src="/images/hr-meeting.jpg" alt="Three colleagues in discussion around a meeting table" style={{ objectPosition: 'center' }} />
            </div>
            <div className={styles.workforceInset}>
              <Photo src="/images/professional.jpg" alt="An African professional seated by an office window" sizes="200px" />
            </div>
            <div className={styles.workforceBadge}>
              <span className={styles.workforceBadgeIcon}><TeamIcon /></span>
              <span>
                <b>People first</b>
                <small>Respect and clarity at every step</small>
              </span>
            </div>
          </Reveal>

          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Who We Are</div>
            <h2>Building better workplaces through people-centred solutions.</h2>
            <p className={styles.workforceLede}>
              People are the foundation of every successful organisation. Managing a workforce requires more than
              filling positions; it requires the right people, effective processes and professional human resource
              support.
            </p>
            <ul className={styles.workforceList}>
              {principles.map((item, i) => (
                <li key={item.title}>
                  <span className={styles.workforceListIcon}>{PRINCIPLE_ICONS[i]}</span>
                  <span>
                    <b>{item.title}</b>
                    <span>{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/about" className={styles.workforceLink}>
              More about Avenyra Global <ArrowRightIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICES (tabs + crossfading photo) ================= */}
      <section id="services" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
            <div>
              <div className={styles.eyebrow}>Our Services</div>
              <h2>Eight integrated services. One workforce partner.</h2>
            </div>
            <p>From finding the right talent to managing everyday workforce requirements, at every stage of growth.</p>
          </Reveal>
          <Reveal>
            <ServicesTabs />
          </Reveal>
        </div>
      </section>

      {/* ================= PHOTO RIBBON ================= */}
      <PhotoMarquee />

      {/* ================= WHY AVENYRA (mosaic + list) ================= */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.why}`}>
          <Reveal className={styles.mosaic}>
            <div className={`${styles.mosaicTile} ${styles.mosaicMain}`}>
              <Photo src="/images/boardroom.jpg" className={styles.mosaicImg} alt="A full boardroom of African professionals in a planning session" />
              <div className={styles.whyVisualTag}><PinIcon size={14} /> Based in Nairobi</div>
              <h3>Your workforce deserves the right support.</h3>
            </div>
            <div className={styles.mosaicTile}>
              <Photo src="/images/mentoring.jpg" className={styles.mosaicImg} alt="A manager advising a colleague over a laptop" />
            </div>
            <div className={`${styles.mosaicTile} ${styles.mosaicNote}`}>
              <TeamIcon size={20} />
              <b>One partner</b>
              <span>Outsourcing, recruitment, payroll and workforce support, together or separately.</span>
            </div>
          </Reveal>

          <div>
            <Reveal className={styles.secHead} style={{ marginBottom: 8 }}>
              <div className={styles.eyebrow}>Why Avenyra Global</div>
              <h2>Support shaped around how your organisation works.</h2>
            </Reveal>
            <div className={styles.whyList}>
              {differentiators.map((item, i) => (
                <Reveal key={item.title} delay={i * 100} className={styles.whyItem}>
                  <div className={styles.whyItemNum}>0{i + 1}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES (photo tiles) ================= */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
            <div>
              <div className={styles.eyebrow}>Industries</div>
              <h2>Supporting organisations across diverse industries.</h2>
            </div>
            <p>Workforce support for the shifts, sites, projects and procedures each sector runs on.</p>
          </Reveal>
          <div className={styles.industryTiles}>
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 4) * 90} className={[0, 3, 4, 7].includes(i) ? styles.industryTileWide : undefined}>
                <Link to={`/industries#${industry.slug}`} className={styles.industryTile}>
                  <Photo src={industry.image} alt={industry.imageAlt} sizes="(max-width: 720px) 100vw, 560px" />
                  <span className={styles.industryTileBody}>
                    <span className={styles.industryTileNum}>{String(i + 1).padStart(2, '0')}</span>
                    <b>{industry.title}</b>
                    <small>{industry.introduction}</small>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className={styles.processBand}>
        <div className={styles.wrap}>
          <Reveal className={styles.processHead}>
            <div>
              <div className={`${styles.eyebrow} ${styles.eyebrowLight}`}>How We Work</div>
              <h2>A simple approach. Meaningful results.</h2>
            </div>
            <p>Four clear stages, from understanding your workforce needs to ongoing support.</p>
          </Reveal>
          <Reveal className={styles.timeline}>
            <div className={styles.timelineTrack} aria-hidden="true" />
            <ol className={styles.timelineSteps}>
              {process.map((step, i) => (
                <li key={step.step} className={styles.timelineStep}>
                  <span className={styles.timelineNode} aria-hidden="true">{step.step}</span>
                  <h3>
                    <span className={styles.visuallyHidden}>Stage {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ================= CAREERS (photo collage) ================= */}
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.careersSplit}`}>
          <Reveal className={styles.workforceText}>
            <div className={styles.eyebrow}>Careers</div>
            <h2>Talent creates possibilities. Opportunities create futures.</h2>
            <p className={styles.workforceLede}>
              We connect talented individuals with organisations seeking capable, motivated and skilled
              professionals. Register your CV and we will be in touch when a suitable role is approved for
              publication.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/careers" className={`${styles.btn} ${styles.btnPrimary}`}>Explore Job Opportunities</Link>
              <Link to="/careers#submit-cv" className={`${styles.btn} ${styles.btnGhost}`}>Submit Your CV <ArrowRightIcon /></Link>
            </div>
          </Reveal>
          <Reveal className={styles.collage}>
            <Photo src="/images/interview-table.jpg" className={styles.collageA} sizes="(max-width: 980px) 50vw, 320px" alt="Two professionals in conversation at an interview table" />
            <Photo src="/images/graduate.jpg" className={styles.collageB} sizes="(max-width: 980px) 50vw, 320px" alt="A graduate in cap and gown in Nairobi" />
            <Photo src="/images/remote-work.jpg" className={styles.collageC} sizes="(max-width: 980px) 50vw, 320px" alt="A professional smiling at her laptop" />
            <span className={styles.collageBadge}><CheckIcon /> CVs kept private</span>
          </Reveal>
        </div>
      </section>

      {/* ================= INSIGHTS ================= */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <Reveal className={`${styles.secHead} ${styles.secHeadRow}`}>
            <div>
              <div className={styles.eyebrow}>Insights</div>
              <h2>Practical notes on people and work.</h2>
            </div>
            <Link to="/insights" className={styles.workforceLink}>All insights <ArrowRightIcon /></Link>
          </Reveal>
          <div className={styles.articleGrid}>
            {articles.slice(0, 3).map((article, i) => (
              <Reveal key={article.slug} delay={i * 110} className={styles.audienceCard}>
                <Link to={`/insights/${article.slug}`} className={styles.audienceLink}>
                  <div className={styles.audienceMedia}>
                    <Photo src={article.image} alt={article.imageAlt} sizes="(max-width: 720px) 100vw, 380px" />
                    <span className={styles.audienceTag}>{article.category}</span>
                  </div>
                  <div className={styles.audienceBody}>
                    <small className={styles.articleDate}>{longDate(article.date)}</small>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <span className={styles.audienceCta}>Read more <ArrowRightIcon size={14} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
