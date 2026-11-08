import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import { ArrowRightIcon } from '../components/icons'
import { articles, insightCategories } from '../content/insights'
import { longDate } from '../lib/format'
import Photo from '../components/Photo'

export default function InsightsPage() {
  const [category, setCategory] = useState<string>('All')
  const [featured, ...rest] = articles
  const list = category === 'All' ? rest : articles.filter((a) => a.category === category)

  return (
    <Layout>
      <section className={styles.pageHero}>
        <div className={styles.wrap}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link to="/">Home</Link><span><span aria-hidden="true">/</span><span aria-current="page">Insights</span></span>
          </nav>
          <div className={styles.eyebrow}>Insights</div>
          <h1 className={styles.insightsTitle}>Practical notes on people and work.</h1>

          {/* Featured article */}
          <Reveal>
            <Link to={`/insights/${featured.slug}`} className={styles.featured}>
              <Photo src={featured.image} alt={featured.imageAlt} priority sizes="(max-width: 980px) 100vw, 640px" />
              <span className={styles.featuredBody}>
                <span className={styles.solutionEyebrow}>Featured · {featured.category}</span>
                <b>{featured.title}</b>
                <small>{featured.description}</small>
                <span className={styles.featuredMeta}>{longDate(featured.date)} <ArrowRightIcon /></span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.filterRow} role="group" aria-label="Filter by topic">
            {['All', ...insightCategories].map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                className={`${styles.filterChip} ${category === name ? styles.filterChipActive : ''}`}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
          {list.length === 0 ? (
            <p className={styles.emptyNote}>No articles in this topic yet.</p>
          ) : (
            <div className={styles.articleGrid}>
              {list.map((article, i) => (
                <Reveal key={article.slug} delay={(i % 3) * 100} className={styles.audienceCard}>
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
          )}
        </div>
      </section>
    </Layout>
  )
}
