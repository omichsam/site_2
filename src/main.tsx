import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ROUTER_BASENAME } from './lib/asset.ts'
// Fonts are bundled with the site rather than loaded from Google Fonts.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'
import './index.css'

const app = (
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pages arrive as prerendered HTML (scripts/prerender.mjs), so hydrate them.
// In development the root is empty, so render from scratch.
const container = document.getElementById('root')!
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
