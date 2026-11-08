import type { ReactNode } from 'react'
import type { ServiceIcon } from '../content/services'

// Line icons for the eight services, drawn on a 24px grid in currentColor.
const PATHS: Record<ServiceIcon, ReactNode> = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18M11 12.5v1.5h2v-1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="8" r="3.2" />
      <path d="M4 19c.6-3.2 3-5 6-5 1.2 0 2.3.3 3.2.8" />
      <circle cx="17" cy="16" r="2.6" />
      <path d="m19 18 2 2" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
      <rect x="4" y="8" width="16" height="11" rx="2.5" />
      <path d="M16 13.5h.01M20 11h-4a2.5 2.5 0 0 0 0 5h4" />
    </>
  ),
  files: (
    <>
      <path d="M8 4h7l4 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M15 4v4h4M9 12h6M9 15.5h6" />
      <path d="M3.5 8v11A2.5 2.5 0 0 0 6 21.5h8" />
    </>
  ),
  graduation: (
    <>
      <path d="m2.5 9.5 9.5-4.5 9.5 4.5-9.5 4.5-9.5-4.5Z" />
      <path d="M6.5 11.5V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.5M21.5 9.5V14" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 20h10M5 7h14M12 4l0 3" />
      <path d="M5 7 2.5 13a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6a3 3 0 0 0 5 0L19 7Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  heart: (
    <>
      <path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.6-7.5 10-7.5 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
}

export default function ServiceGlyph({ name, size = 20 }: { name: ServiceIcon; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
