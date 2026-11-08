import { Link, Navigate, useParams } from 'react-router-dom'
import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import { ArrowRightIcon } from '../components/icons'
import { articles, getArticle } from '../content/insights'
import { asset } from '../lib/asset'
import { longDate } from '../lib/format'
import { usePageMeta } from '../lib/usePageMeta'

export default function InsightDetailPage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  usePageMeta(article?.title ?? 'Insight', article?.description)
  if (!article) return <Navigate to="/insights" replace />

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <Layout>
      <article>
        <header className={styles.articleHero}>
          <img src={asset(article.image)} alt={article.imageAlt} />
          <div className={styles.wrap}>
            <nav aria-label="Breadcrumb" className={`${styles.crumbs} ${styles.crumbsLight}`}>
              <Link to="/">Home</Link>
              <span><span aria-hidden="true">/</span><Link to="/insights">Insights</Link></span>
            </nav>
            <span className={styles.solutionEyebrow}>{article.category} · {longDate(article.date)}</span>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        </header>
        <div className={`${styles.wrap} ${styles.articleBody}`}>
          {article.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          <div className={styles.articleCta}>
            <b>Need support with this?</b>
            <Link to="/contact?enquiry=consultation" className={`${styles.btn} ${styles.btnPrimary}`}>Request a Consultation</Link>
          </div>
        </div>
      </article>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <div className={styles.eyebrow}>Keep Reading</div>
            <h2>More insights</h2>
          </div>
          <div className={styles.miniCards}>
            {more.map((item) => (
              <Link key={item.slug} to={`/insights/${item.slug}`} className={styles.miniCard}>
                <img src={asset(item.image)} alt="" loading="lazy" />
                <span>
                  <b>{item.title}</b>
                  <small>Read more <ArrowRightIcon size={13} /></small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
