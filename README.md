# Avenyra Global: Site 2

Marketing website for Avenyra Global, a human resource outsourcing, recruitment and workforce solutions company.

- **Content** (services, industries, values, insights) comes from the Avenyra Global HR site (`outsource-hr-crm`).
- **Design** (fonts, colours, buttons, cards, hero panel and services tabs) matches the main Avenyra Global website.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About Us |
| `/services` | All eight services |
| `/services/:slug` | One service in detail |
| `/industries` | Eight industries |
| `/careers` | Career fields, recruitment process, CV registration |
| `/insights`, `/insights/:slug` | Articles |
| `/contact` | Contact details and enquiry form |
| `/privacy`, `/terms` | Legal |

## Run it

```bash
npm install
npm run dev          # http://localhost:5180
npm run build        # production build in dist/, every page prerendered
npm run build:pages  # build for GitHub Pages at /site_2/
npm run images       # after adding or replacing a photo: makes the WebP sizes
npm run og           # after changing page titles or photos: remakes link-preview images
```

## Where things live

- `src/content/`: all page copy (edit text here, not in the pages).
- `src/lib/seo.ts`: every page's title, description, share image and structured data.
- `src/styles/site.module.css`: the shared design system.
- `public/images/`: photography (Unsplash License, no attribution required). `public/images/opt/` holds the generated WebP sizes.
- `public/og/`: generated link-preview images.

## How a build works

1. `vite build` bundles the site, and a second build makes a server version of it.
2. `scripts/prerender.mjs` renders every route to `dist/<route>/index.html` with its own head tags and structured data, writes `404.html`, `sitemap.xml` and `robots.txt`.
3. In the browser, React takes over the prerendered HTML (hydration) without re-rendering it.

To use a custom domain, set `VITE_SITE_URL` (for example `https://avenyraglobal.com`) and `BASE_PATH=/` when building, so canonical links, the sitemap and preview images point to it.

## Forms

There is no backend yet. The enquiry and CV forms open a pre-filled email to `info@avenyraglobal.com`.
