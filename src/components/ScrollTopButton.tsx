import { useEffect, useState } from 'react'
import styles from '../styles/site.module.css'

// Floating "return to top" button. Appears after scrolling past the first
// screen; the ring around it fills as you move down the page.
export default function ScrollTopButton() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const circumference = 2 * Math.PI * 22

  return (
    <button
      type="button"
      className={`${styles.toTop} ${visible ? styles.toTopVisible : ''}`}
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      }}
      aria-label="Return to the top of the page"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg className={styles.toTopRing} width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
        <circle
          cx="26" cy="26" r="22" fill="none" stroke="#DF6E28" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)}
          transform="rotate(-90 26 26)"
        />
      </svg>
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13V3M8 3 4 7M8 3l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
