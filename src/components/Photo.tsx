import type { CSSProperties } from 'react'
import sizes from '../content/imageSizes.json'
import { asset } from '../lib/asset'

const WIDTHS = [480, 960, 1400]
const SIZES = sizes as unknown as Record<string, [number, number]>

export function photoName(src: string) {
  return src.replace(/^.*\//, '').replace(/\.jpe?g$/i, '')
}

/** The WebP file closest to a given width, for places that need one URL. */
export function photoUrl(src: string, width = 960) {
  const w = WIDTHS.find((x) => x >= width) ?? 1400
  return asset(`/images/opt/${photoName(src)}-${w}.webp`)
}

// A photo from public/images served as responsive WebP (480, 960 and 1400px,
// made by scripts/optimize-images.mjs), with the original JPEG as fallback.
// Width and height are always set so the layout doesn't jump while loading.
export default function Photo({
  src,
  alt,
  sizes: sizesAttr = '(max-width: 980px) 100vw, 50vw',
  className,
  style,
  priority = false,
}: {
  src: string
  alt: string
  /** How wide the photo displays, so the browser picks the smallest file that fits. */
  sizes?: string
  className?: string
  style?: CSSProperties
  /** The main photo at the top of a page: load it first instead of lazily. */
  priority?: boolean
}) {
  const name = photoName(src)
  const [width, height] = SIZES[name] ?? [1400, 935]
  const srcSet = WIDTHS.filter((_, i) => i === 0 || WIDTHS[i - 1] < width)
    .map((w) => `${asset(`/images/opt/${name}-${w}.webp`)} ${Math.min(w, width)}w`)
    .join(', ')
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizesAttr} />
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}
