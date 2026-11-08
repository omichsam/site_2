# Changelog

All notable changes to this site are recorded here, following [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## [Unreleased]

### Changed
- Photography now mostly shows African professionals: new photos for payroll, HR advisory, temporary staffing, benefits, banking, healthcare, manufacturing and logistics, hospitality and SMEs, plus office and team photos for the page sections.
- Every photo is used for one purpose only (a service, industry or article photo appears only with that item). `node scripts/check-photos.mjs` checks this.
- Career fields on the Careers page are icon cards with typical roles, instead of reusing industry photos.
- People photos in tiles are framed a little higher so faces stay in view.

### Removed
- The "People at Work" photo gallery on About Us and the scrolling photo ribbon on the home page, which repeated photos used elsewhere.
- The small face avatars under the home page buttons.

### Fixed
- The vision and mission cards on About Us are about half as tall: the photos are now short banners.
- Service photos on Our Services and the industry shortcuts keep their intended shape instead of showing at full photo height.

## [1.2.0] - 2026-11-08

### Added
- Visit statistics with GoatCounter (anonymous, no cookies, no consent banner). Counts every page view, including moves between pages, and these actions: consultation and contact buttons, "Discuss this service", CV links, phone, email and WhatsApp clicks, and enquiry and CV form submissions (only the chosen category is recorded).
- Privacy Policy explains the visit statistics.

## [1.1.0] - 2026-11-08

Faster pages, better search results and link previews, and accessibility fixes.

### Added
- Floating return-to-top button on every page, with a ring that fills as you scroll. On desktop it floats at the middle of the right edge with a "Back to top" label on hover; on phones it sits in the bottom corner.
- Every page is prerendered to real HTML, so content shows before scripts load and search engines read each page in full.
- Each page has its own title, description, canonical address and link-preview image for WhatsApp, LinkedIn and X.
- Structured data for search engines: the company, each service, each article and breadcrumbs.
- `sitemap.xml` and `robots.txt`.
- 21 branded link-preview images and a 512px logo for search results and home-screen icons.

### Changed
- Photos are served as responsive WebP in three sizes, so phones download much smaller files. Every photo has its size set, so the layout no longer jumps while images load.
- The main photo at the top of each page loads first; the rest load as you scroll.
- Sections below the first screen are laid out only as they come near the screen, which roughly halves the browser's work while a page first loads.
- Industry tiles on the home page now fill three complete rows.

### Fixed
- Pages such as `/services/payroll-management` opened directly no longer return a "not found" status.
- Small orange text (section labels, "Learn more" links) now meets contrast guidelines.
- The logo link's accessible name now matches its visible text.
- Links to a section (for example an industry from the home page) land just below the header instead of 90px lower.

## [1.0.0] - 2026-11-08

First release.

### Added
- Home page: hero with the "How we support you" panel, the eight services as tabs beside a crossfading photo, a photo ribbon, why Avenyra Global, industry photo tiles, how we work, careers and insights.
- About, Services, eight service detail pages, Industries, Careers, Insights with topic filters, article pages, Contact, Privacy Policy and Terms.
- Enquiry and CV registration forms that prepare an email to Avenyra Global.
- 29 workforce photographs matched to each service, industry and article.
