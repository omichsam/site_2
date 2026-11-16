import styles from '../styles/site.module.css'
import Layout from '../components/Layout'
import { currentRelease, releases } from '../content/releases'
import { longDate } from '../lib/format'

export default function ReleasesPage() {
  const current = currentRelease(__APP_VERSION__)
  return (
    <Layout>
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.legal}`}>
          <div className={styles.eyebrow}>What’s New</div>
          <h1>Release notes.</h1>
          <p>
            Each version of this website is named after a place in Kenya, in alphabetical order. You are
            viewing <b>{current.name}</b> (version {__APP_VERSION__}).
          </p>
          <ol className={styles.releaseList}>
            {releases.map((r) => (
              <li key={r.version} className={styles.releaseItem}>
                <span className={styles.releaseLetter} aria-hidden="true">{r.name[0]}</span>
                <div>
                  <h2>{r.name} <small>{r.version}</small></h2>
                  <p className={styles.releaseMeta}>{longDate(r.date)} · {r.place}</p>
                  <ul>
                    {r.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  )
}
