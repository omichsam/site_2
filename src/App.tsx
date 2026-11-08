import { Link, Route, Routes } from 'react-router-dom'
import styles from './styles/site.module.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import IndustriesPage from './pages/IndustriesPage'
import CareersPage from './pages/CareersPage'
import InsightsPage from './pages/InsightsPage'
import InsightDetailPage from './pages/InsightDetailPage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import { usePageMeta } from './lib/usePageMeta'

function NotFound() {
  usePageMeta('Page not found')
  return (
    <Layout>
      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.legal}`}>
          <div className={styles.eyebrow}>404</div>
          <h1>Page not found.</h1>
          <p>The page you are looking for has moved or does not exist.</p>
          <Link to="/" className={`${styles.btn} ${styles.btnPrimary}`}>Back to home</Link>
        </div>
      </section>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/insights/:slug" element={<InsightDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<LegalPage doc="privacy" />} />
      <Route path="/terms" element={<LegalPage doc="terms" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
