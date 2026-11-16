// Every release has a number (for people who build the site) and a name (for
// everyone else). Names are Kenyan places, in alphabetical order: each new
// minor or major release takes the next letter, and a patch release keeps the
// name of the release it fixes. See docs/VERSIONING.md.

export interface Release {
  version: string
  name: string
  /** One line about the place the release is named after. */
  place: string
  date: string
  /** What visitors noticed, in plain words. */
  highlights: string[]
}

/** Newest first. Add a release at the top when you run a new version. */
export const releases: Release[] = [
  {
    version: '1.3.0',
    name: 'Diani',
    place: 'A white sand beach on Kenya’s south coast.',
    date: '2026-11-16',
    highlights: [
      'A new home page opening: “Build and manage high-performing teams in Kenya.”',
      'Serif headings and typewriter style section labels across the site.',
      'Photography that mostly shows African professionals, with every photo used once.',
      'Shorter vision and mission cards on About Us.',
    ],
  },
  {
    version: '1.2.0',
    name: 'Chalbi',
    place: 'A desert of salt flats in northern Kenya.',
    date: '2026-11-08',
    highlights: ['Anonymous visit statistics with no cookies, explained in the Privacy Policy.'],
  },
  {
    version: '1.1.0',
    name: 'Baringo',
    place: 'A freshwater lake in the Rift Valley.',
    date: '2026-11-08',
    highlights: [
      'Faster pages, sharper link previews and better search results.',
      'A floating return to top button.',
      'Accessibility fixes for contrast and links.',
    ],
  },
  {
    version: '1.0.0',
    name: 'Amboseli',
    place: 'A national park beneath Mount Kilimanjaro.',
    date: '2026-11-08',
    highlights: ['First release of the Avenyra Global website.'],
  },
]

/** Names reserved for the releases to come, in order. */
export const upcomingNames = [
  'Elgon', 'Fourteen Falls', 'Gede', 'Hell’s Gate', 'Isiolo', 'Kakamega', 'Lamu', 'Malindi',
  'Naivasha', 'Ol Pejeta', 'Pate', 'Ruma', 'Samburu', 'Tsavo', 'Ukunda', 'Voi', 'Watamu',
]

/** The release this build belongs to: an exact match, or the release a patch fixes. */
export function currentRelease(version: string): Release {
  const minor = version.split('.').slice(0, 2).join('.')
  return releases.find((r) => r.version === version)
    ?? releases.find((r) => r.version.startsWith(`${minor}.`))
    ?? releases[0]
}
