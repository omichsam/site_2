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
npm run build        # production build in dist/
npm run build:pages  # build for GitHub Pages at /site_2/
```

## Where things live

- `src/content/`: all page copy (edit text here, not in the pages).
- `src/styles/site.module.css`: the shared design system.
- `public/images/`: photography (Unsplash License, no attribution required).

## Forms

There is no backend yet. The enquiry and CV forms open a pre-filled email to `info@avenyraglobal.com`.
