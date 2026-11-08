# Changelog

All notable changes to this site are recorded here, following [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

## [Unreleased]

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

### Fixed
- Pages such as `/services/payroll-management` opened directly no longer return a "not found" status.
- Small orange text (section labels, "Learn more" links) now meets contrast guidelines.
- The logo link's accessible name now matches its visible text.

## [1.0.0] - 2026-11-08

First release.

### Added
- Home page: hero with the "How we support you" panel, the eight services as tabs beside a crossfading photo, a photo ribbon, why Avenyra Global, industry photo tiles, how we work, careers and insights.
- About, Services, eight service detail pages, Industries, Careers, Insights with topic filters, article pages, Contact, Privacy Policy and Terms.
- Enquiry and CV registration forms that prepare an email to Avenyra Global.
- 29 workforce photographs matched to each service, industry and article.
