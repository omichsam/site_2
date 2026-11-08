// Checks that every photo in public/images is used for exactly one purpose.
// A service, industry or article photo is defined once in src/content and then
// shown wherever that item appears, which counts as one use.
//
//   node scripts/check-photos.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])

const uses = {}
for (const file of walk(path.join(root, 'src')).filter((f) => /\.tsx?$/.test(f))) {
  const rel = path.relative(path.join(root, 'src'), file).replaceAll('\\', '/')
  if (rel === 'lib/seo.ts') continue // link-preview images reuse each page's own photo
  for (const m of fs.readFileSync(file, 'utf8').matchAll(/\/images\/([a-z0-9-]+)\.jpg/g)) {
    ;(uses[m[1]] ??= []).push(rel)
  }
}
const files = fs.readdirSync(path.join(root, 'public', 'images')).filter((f) => f.endsWith('.jpg')).map((f) => f.slice(0, -4))
const repeated = Object.entries(uses).filter(([, where]) => where.length > 1)
const unused = files.filter((f) => !uses[f])
const missing = Object.keys(uses).filter((u) => !files.includes(u))

console.log(`${Object.keys(uses).length} photos in use, ${files.length} files`)
for (const [name, where] of repeated) console.log(`REPEATED ${name}: ${where.join(', ')}`)
for (const name of unused) console.log(`UNUSED   ${name}.jpg`)
for (const name of missing) console.log(`MISSING  ${name}.jpg`)
if (repeated.length || missing.length) process.exit(1)
console.log(unused.length ? 'OK (with unused files)' : 'OK: every photo is used once')
