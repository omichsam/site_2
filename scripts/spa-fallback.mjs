// Static hosts (GitHub Pages and most others) serve 404.html for unknown
// paths. Copying the app shell there lets deep links such as /services/payroll
// load the React app, which then renders the right page.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('Wrote dist/404.html (SPA fallback)')
