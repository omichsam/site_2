// Makes responsive WebP copies of every photo in public/images, and records
// each photo's size so pages can reserve space before it loads (no layout jump).
//
//   npm run images      (run again after adding or replacing a photo)
//
// Output:
//   public/images/opt/<name>-<width>.webp   at 480, 960 and 1400px (never upscaled)
//   src/content/imageSizes.json              { "<name>": [width, height] }
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'public', 'images')
const outDir = path.join(srcDir, 'opt')
export const WIDTHS = [480, 960, 1400]

await fs.mkdir(outDir, { recursive: true })
const files = (await fs.readdir(srcDir)).filter((f) => /\.jpe?g$/i.test(f)).sort()
const sizes = {}
let before = 0
let after = 0

for (const file of files) {
  const name = file.replace(/\.jpe?g$/i, '')
  const input = path.join(srcDir, file)
  const { width, height } = await sharp(input).metadata()
  sizes[name] = [width, height]
  before += (await fs.stat(input)).size
  for (const w of WIDTHS) {
    const target = Math.min(w, width)
    const out = path.join(outDir, `${name}-${w}.webp`)
    await sharp(input).resize({ width: target, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toFile(out)
    if (w === 960) after += (await fs.stat(out)).size
  }
}

await fs.writeFile(path.join(root, 'src', 'content', 'imageSizes.json'), JSON.stringify(sizes, null, 2) + '\n')
console.log(`${files.length} photos → ${files.length * WIDTHS.length} WebP files`)
console.log(`Original JPEGs ${(before / 1024 / 1024).toFixed(1)} MB; the 960px WebP set is ${(after / 1024 / 1024).toFixed(1)} MB`)
