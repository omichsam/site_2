# Versioning

Every release of this website has two labels:

- **A number**, such as `1.3.0`, for the people who build the site.
- **A name**, such as **Diani**, for everyone else. Names are places in Kenya, taken in alphabetical order, so the first letter tells you how far along a release is: Amboseli came first, Diani is the fourth.

The footer shows both ("Version 1.3.0 · Diani") and links to the What's New page at `/releases`.

## Numbers

The number follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

| Change | Example | Number | Name |
|---|---|---|---|
| A fix that changes nothing visitors would describe as new | A typo, a broken link, a layout bug | Patch: 1.3.0 → 1.3.1 | Keeps the current name |
| Something visitors can see is new or different | A new section, new photos, a redesigned page | Minor: 1.3.0 → 1.4.0 | Takes the next name |
| A change to what the site is for | A full rebrand, a client portal, a new domain | Major: 1.4.0 → 2.0.0 | Takes the next name |

## Names so far

| Version | Name | Place | Date |
|---|---|---|---|
| 1.0.0 | Amboseli | A national park beneath Mount Kilimanjaro | 8 November 2026 |
| 1.1.0 | Baringo | A freshwater lake in the Rift Valley | 8 November 2026 |
| 1.2.0 | Chalbi | A desert of salt flats in northern Kenya | 8 November 2026 |
| 1.3.0 | Diani | A white sand beach on the south coast | 16 November 2026 |

## Names reserved for coming releases

Elgon, Fourteen Falls, Gede, Hell's Gate, Isiolo, Kakamega, Lamu, Malindi, Naivasha, Ol Pejeta, Pate, Ruma, Samburu, Tsavo, Ukunda, Voi, Watamu.

Letters with no well known place (J, Q, X, Y, Z) are skipped. After Watamu, names start again at A with Kenyan rivers (Athi, Ewaso Ng'iro, Galana and so on).

## How to make a release

1. Move the items under `[Unreleased]` in `CHANGELOG.md` into a new heading: `## [1.4.0] "Elgon" - YYYY-MM-DD`.
2. Add the release at the top of `releases` in `src/content/releases.ts`, with the place line and two to four highlights in plain words, and remove its name from `upcomingNames`.
3. Set `"version"` in `package.json`.
4. Commit, then tag: `git tag -a v1.4.0 -m "1.4.0 Elgon"`.
5. Build and publish: `npm run build:pages`, then push `dist` to the `gh-pages` branch.

A patch release skips step 2's new entry: it changes only the number, and the footer keeps showing the name of the release it fixes.
