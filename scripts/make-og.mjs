// Generates the link-preview images (1200×630) shown when a page is shared on
// WhatsApp, LinkedIn, X and others, plus the 512px logo used in search results.
//
//   npm run og      (run again after changing page titles or photos)
//
// Output: public/og/<name>.jpg for every entry in ogImageSpecs() (src/lib/seo.ts),
//         public/logo-512.png
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { ogImageSpecs } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href)
const outDir = path.join(root, 'public', 'og')
await fs.mkdir(outDir, { recursive: true })

const W = 1200
const H = 630
const PHOTO_W = 470
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const LOGO = (size, letter = '#FFFFFF') => `
  <svg width="${size}" height="${size}" viewBox="0 0 200 200">
    <defs><linearGradient id="arc" x1="160" y1="40" x2="150" y2="170" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#DF6E28"/><stop offset="1" stop-color="#D83D78"/></linearGradient></defs>
    <path d="M156.7 52.4A74 74 0 1 0 158.3 145.6" stroke="url(#arc)" stroke-width="14" stroke-linecap="round" fill="none"/>
    <circle cx="156.7" cy="52.4" r="13" fill="#DF6E28"/>
    <path d="M170.6 129.8L166.8 157.4L144.8 140.2Z" fill="#D83D78" stroke="#D83D78" stroke-width="6" stroke-linejoin="round"/>
    <text x="100" y="134" font-family="${FONT}" font-weight="800" font-size="98" fill="${letter}" text-anchor="middle">A</text>
  </svg>`

function wrap(text, maxChars) {
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) { lines.push(line); line = word } else line = (line + ' ' + word).trim()
  }
  if (line) lines.push(line)
  return lines
}

function titleLines(title) {
  for (const [size, chars] of [[58, 19], [50, 22], [44, 25], [38, 29]]) {
    const lines = wrap(title, chars)
    if (lines.length <= 3) return { size, lines }
  }
  return { size: 38, lines: wrap(title, 29).slice(0, 4) }
}

async function card(name, { title, kicker, photo }) {
  const { size, lines } = titleLines(title)
  const lineH = Math.round(size * 1.18)
  const titleTop = 300 - ((lines.length - 1) * lineH) / 2
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A2068"/><stop offset="1" stop-color="#1D1650"/></linearGradient>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) scale(520 380)"><stop offset="0" stop-color="#DF6E28" stop-opacity=".22"/><stop offset="1" stop-color="#DF6E28" stop-opacity="0"/></radialGradient>
      <linearGradient id="rule" x1="0" x2="1"><stop offset="0" stop-color="#DF6E28"/><stop offset=".5" stop-color="#D83D78"/><stop offset="1" stop-color="#7149CC"/></linearGradient>
      <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#1F1856"/><stop offset=".28" stop-color="#1F1856" stop-opacity="0"/></linearGradient>
    </defs>
    <rect x="${W - PHOTO_W}" y="0" width="${PHOTO_W}" height="${H}" fill="url(#fade)"/>
    <rect width="${W}" height="6" fill="url(#rule)"/>
    <g transform="translate(64 58)">${LOGO(64)}</g>
    <text x="142" y="92" font-family="${FONT}" font-weight="800" font-size="30" fill="#FFFFFF">Avenyra</text>
    <text x="143" y="116" font-family="${FONT}" font-weight="700" font-size="14" letter-spacing="5" fill="#F4A06B">GLOBAL</text>
    <text x="64" y="${titleTop - size - 18}" font-family="${FONT}" font-weight="700" font-size="17" letter-spacing="3" fill="#F4A06B">${esc(kicker.toUpperCase())}</text>
    ${lines.map((l, i) => `<text x="64" y="${titleTop + i * lineH}" font-family="${FONT}" font-weight="800" font-size="${size}" fill="#FFFFFF">${esc(l)}</text>`).join('\n    ')}
    <text x="64" y="568" font-family="${FONT}" font-weight="600" font-size="19" fill="#B9B2E0">HR Outsourcing  ·  Recruitment  ·  Payroll  ·  Nairobi, Kenya</text>
  </svg>`
  const photoBuf = await sharp(path.join(root, 'public', photo)).resize(PHOTO_W, H, { fit: 'cover', position: 'attention' }).toBuffer()
  // Rounded left edge on the photo, so it reads as a panel rather than a crop.
  const mask = Buffer.from(`<svg width="${PHOTO_W}" height="${H}"><rect x="0" y="0" width="${PHOTO_W + 40}" height="${H}" rx="36" fill="#fff"/></svg>`)
  const photoPanel = await sharp(photoBuf).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
  const background = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A2068"/><stop offset="1" stop-color="#1D1650"/></linearGradient>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) scale(520 380)"><stop offset="0" stop-color="#DF6E28" stop-opacity=".22"/><stop offset="1" stop-color="#DF6E28" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
  </svg>`
  const base = await sharp({ create: { width: W, height: H, channels: 3, background: '#241B60' } })
    .composite([
      { input: Buffer.from(background), left: 0, top: 0 },
      { input: photoPanel, left: W - PHOTO_W, top: 0 },
      { input: Buffer.from(svg), left: 0, top: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(outDir, `${name}.jpg`))
  return base
}

const specs = ogImageSpecs()
for (const [name, spec] of Object.entries(specs)) {
  await card(name, spec)
  console.log(`og/${name}.jpg`)
}

// 512px logo for search results and home-screen icons.
const logoSvg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="112" fill="#271E60"/><g transform="translate(56 56)">${LOGO(400)}</g></svg>`
await sharp(Buffer.from(logoSvg)).png().toFile(path.join(root, 'public', 'logo-512.png'))
console.log(`logo-512.png, ${Object.keys(specs).length} share images`)
