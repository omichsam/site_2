import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import { ArrowRightIcon } from '../components/icons'
import { articles, insightCategories } from '../content/insights'
import { asset } from '../lib/asset'
import { longDate } from '../lib/format'
import { usePageMeta } from '../lib/usePageMeta'

export default function InsightsPage() {
  usePageMeta('Insights', 'Practical notes on HR management, recruitment, employment practices, payroll, career development and leadership.')
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
              <img src={asset(featured.image)} alt={featured.imageAlt} />
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
                      <img src={asset(article.image)} alt={article.imageAlt} loading="lazy" />
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
