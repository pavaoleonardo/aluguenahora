/**
 * Site-wide constants and helpers for link previews (Open Graph / Twitter cards).
 *
 * WhatsApp, Facebook, Telegram and Slack build their preview card from the **server-rendered**
 * `<meta property="og:*">` tags of the shared URL — never from JavaScript. That is why the
 * property page declares them in `generateMetadata` (App Router) instead of a client component:
 * the crawler does not run React.
 *
 * `NEXT_PUBLIC_SITE_URL` is optional and, like `NEXT_PUBLIC_API_URL`, inlined at build time; the
 * fallback is the public apex domain so a build made without it still produces absolute preview
 * URLs (relative `og:image` values are ignored by WhatsApp).
 */
import { API_BASE_URL } from '@/lib/apiBase'
import { formatCurrency } from '@/lib/format'

/** Public origin of the storefront, no trailing slash: `https://aluguenahora.com.br`. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aluguenahora.com.br').replace(/\/+$/, '')

/** Brand name shown by link previews as the site name. */
export const SITE_NAME = 'Alugue na Hora'

/** Default description used when a page has nothing more specific. */
export const SITE_DESCRIPTION =
  'Encontre o seu próximo lar! Imóveis para alugar e para comprar com agilidade e os melhores preços em Campo Grande - MS.'

/**
 * Fallback preview image, served from `frontend/public`.
 *
 * `og-default.jpg` is a 1200×800 / ~150 KB JPEG derived from `modern_facade.jpg`: the preview
 * crawlers (WhatsApp in particular) **drop images above ~300 KB**, and the original asset is a
 * 6 MB camera file, so reusing it meant "no thumbnail" on every page without its own photo.
 */
const FALLBACK_SHARE_IMAGE = '/og-default.jpg'

/**
 * Canonical preview-card size: 1.91:1, the ratio Facebook/WhatsApp crop a large card into anyway.
 * Declaring the exact pixels — and cropping to them here — hands the crawler a ready-made
 * landscape thumbnail instead of a 4:3 camera upload it has to interpret (every photo in this
 * library is 1024×768).
 */
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

/**
 * Pixels of the fallback asset (`/og-default.jpg`). It is used as-is — no crop — so it keeps its
 * own 1200×800 shape; declared so the site-wide card is as explicit as a listing card.
 */
export const FALLBACK_SHARE_IMAGE_WIDTH = 1200
export const FALLBACK_SHARE_IMAGE_HEIGHT = 800

/**
 * Cloudinary derivative used for previews: JPEG (WhatsApp's crawler does not render the WebP/AVIF
 * that `f_auto` would hand it), quality-optimised and then cropped around the centre of interest
 * to the card ratio (preview thumbnails have a small byte budget — a 3 MB camera upload is simply
 * dropped by WhatsApp).
 */
const SHARE_IMAGE_TRANSFORM = `f_jpg,g_auto,q_auto:good,c_fill,w_${OG_IMAGE_WIDTH},h_${OG_IMAGE_HEIGHT}`

/** Turns a possibly-relative media path into an absolute URL usable inside `og:image`. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  if (pathOrUrl.startsWith('/')) return `${SITE_URL}${pathOrUrl}`
  return `${SITE_URL}/${pathOrUrl}`
}

/**
 * Preview image for a media `url` coming from the API: absolutised, and (when it is a Cloudinary
 * upload) rewritten to the JPEG/1200px derivative described above. Falls back to the site image
 * so a listing without a photo still shows a card with a thumbnail.
 */
export function socialImageUrl(rawUrl?: string | null): string {
  if (!rawUrl) return absoluteUrl(FALLBACK_SHARE_IMAGE)

  // Local uploads come back as `/uploads/...` and are served by the API host, not by the site.
  const absolute = rawUrl.startsWith('/') ? `${API_BASE_URL}${rawUrl}` : rawUrl

  return absolute.includes('/image/upload/')
    ? absolute.replace('/image/upload/', `/image/upload/${SHARE_IMAGE_TRANSFORM}/`)
    : absolute
}

/** Entry for `openGraph.images`: the preview URL, plus its pixels when we control the crop. */
type ShareImage = { url: string; alt?: string; width?: number; height?: number; type?: string }

/**
 * `openGraph.images` descriptor for a media `url`.
 *
 * The width/height/type are declared **only** for the Cloudinary derivative, whose pixels we set
 * ourselves. The site fallback and local uploads carry no declared size on purpose: guessing it
 * would be a lie the crawler may act on (a mismatched `og:image:width` is worse than none).
 */
export function shareImage(rawUrl?: string | null, alt?: string): ShareImage {
  const url = socialImageUrl(rawUrl)
  const entry: ShareImage = { url }
  if (alt) entry.alt = alt

  if (!rawUrl) {
    // Our own fallback asset: fixed 1200×800 JPEG.
    entry.width = FALLBACK_SHARE_IMAGE_WIDTH
    entry.height = FALLBACK_SHARE_IMAGE_HEIGHT
    entry.type = 'image/jpeg'
  } else if (url.includes('/image/upload/')) {
    entry.width = OG_IMAGE_WIDTH
    entry.height = OG_IMAGE_HEIGHT
    entry.type = 'image/jpeg'
  }
  // Local (non-Cloudinary) uploads keep no declared size on purpose: guessing one would be a lie
  // the crawler may act on, and a wrong `og:image:width` is worse than an absent one.

  return entry
}

type RichTextNode = {
  type?: string
  text?: string
  url?: string
  children?: RichTextNode[]
}

/** Recursively collects the visible text of a Strapi "blocks" / rich-text node list. */
function collectNodeText(node: unknown, out: string[]): void {
  if (Array.isArray(node)) {
    node.forEach((child) => collectNodeText(child, out))
    return
  }
  if (!node || typeof node !== 'object') return

  const typed = node as RichTextNode
  if (typeof typed.text === 'string' && typed.text.trim()) out.push(typed.text)
  if (typed.children) collectNodeText(typed.children, out)
}

/**
 * Flattens a Strapi rich-text value (blocks array, plain string or `null`) into a single line of
 * plain text, ready for a preview card.
 */
export function richTextToPlainText(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value.replace(/\s+/g, ' ').trim()

  const parts: string[] = []
  collectNodeText(value, parts)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

type ShareTitleInput = {
  titulo?: string | null
  preco?: number | string | null
}

/**
 * Headline shared by the "Enviar por WhatsApp" message and the preview card (`og:title`):
 * `Apartamento Mobiliado — R$ 2.000,00`.
 *
 * One function for both call sites is the whole point: the text WhatsApp shows *above* the card
 * and the headline *inside* it are the same string, so they can never drift apart. The price is
 * only appended when it exists (`Number()` first, because `formatCurrency` reads a bare *string*
 * as cents), so a listing without a price does not advertise `R$ 0,00`.
 */
export function buildShareTitle(property: ShareTitleInput): string {
  const titulo = (property.titulo || '').trim() || SITE_NAME
  const preco = Number(property.preco) || 0
  return preco > 0 ? `${titulo} — ${formatCurrency(preco)}` : titulo
}

/** Cuts `text` at a word boundary, appending an ellipsis when it was actually shortened. */
export function truncate(text: string, maxLength: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= maxLength) return clean

  const cut = clean.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  const body = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut
  return `${body.trim()}…`
}
