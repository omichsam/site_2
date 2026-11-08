// Builds the site for a GitHub Pages project URL (https://<user>.github.io/<repo>/).
// Usage: npm run build:pages            (base path /site_2/)
//        BASE_PATH=/other/ npm run build:pages
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const base = process.env.BASE_PATH || '/site_2/'
execSync('npm run build', { stdio: 'inherit', env: { ...process.env, BASE_PATH: base } })
// Stop GitHub Pages from running the output through Jekyll.
writeFileSync('dist/.nojekyll', '')
console.log(`Built for GitHub Pages at ${base}`)
