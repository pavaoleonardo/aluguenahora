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

/**
 * Click-attribution query pair appended to every link this app sends **inside a WhatsApp message**.
 *
 * WhatsApp does not keep a share debugger: it caches a link preview against the **exact URL
 * string**, and the answer it keeps is the one from the first time it ever saw that string. Every
 * listing URL that was forwarded before this project had usable `og:*` tags is therefore stuck on
 * a cached "no preview" — Facebook's Sharing Debugger looks perfect for the same URL, because
 * re-scraping there does not touch WhatsApp's cache (verified 2026-10-03: live page serves a full
 * card — title, description, a 1200×630 / 118 KB JPEG — to the `WhatsApp` user agent, and the
 * debugger renders it, while the pre-existing link still arrives bare).
 *
 * A different string is a different cache entry — and that is the *only* escape hatch, because
 * editing the tags can never revive a URL string WhatsApp has already answered "no preview" for.
 * A fixed variant is not enough on its own (see {@link WHATSAPP_SHARE_TOKEN_PARAM}): the first
 * share that goes out with it poisons that exact string too.
 *
 * It doubles as click attribution (WhatsApp is where Brazilian brokers forward listings), and it
 * stays out of the card's own address: `generateMetadata` canonicalises to the clean
 * `/imoveis/<documentId>`, and the query is ignored by the route.
 */
export const WHATSAPP_SHARE_PARAM = 'utm_source=whatsapp'

/**
 * Nonce appended by {@link whatsappShareUrl} so every share is a URL string WhatsApp has never
 * seen and therefore always gets a fresh scrape instead of a cached verdict.
 *
 * Evidence this is what breaks shares (nginx access log, 2026-10-03): every string that had been
 * tried before — the plain listing URL, one with `?v=2`, one with `?utm_source=whatsapp` — came
 * back 200 with the full ~33 KB HTML and still arrived as a bare link, while fresh strings were
 * fetched again from the sender's own IP with a `WhatsApp/…` user agent. The card is built by the
 * **sender's** device, not by Meta's servers, so a single poisoned string follows that link
 * everywhere it is pasted — including into a chat that never saw it.
 */
export const WHATSAPP_SHARE_TOKEN_PARAM = 's'

/**
 * Unique-enough nonce for one share: base-36 milliseconds plus random bits (~14 chars). Not a
 * secret and not an auth token — it only has to differ from every string shared before it, which
 * is what makes WhatsApp re-scrape the card.
 */
export function createShareToken(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Returns `url` in the shape that goes inside a WhatsApp message: absolute, tagged with
 * {@link WHATSAPP_SHARE_PARAM} for attribution and a {@link WHATSAPP_SHARE_TOKEN_PARAM} nonce that
 * defeats the cached verdict. Existing query values are replaced rather than appended, so a link
 * forwarded from another WhatsApp message does not accumulate `?utm_source=…&s=…` twice.
 *
 * `token` is optional: a caller that builds the URL during render can hold one nonce for the whole
 * page view (a stable `href`, no churn on unrelated re-renders), while a caller that builds it at
 * click time simply lets the helper create a fresh one.
 */
export function whatsappShareUrl(url: string, token: string = createShareToken()): string {
  const [sourceName, sourceValue] = WHATSAPP_SHARE_PARAM.split('=')
  const target = new URL(url, SITE_URL)
  target.searchParams.set(sourceName, sourceValue)
  target.searchParams.set(WHATSAPP_SHARE_TOKEN_PARAM, token)
  return target.toString()
}

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
 *
 * Commas and the quality colon are percent-encoded on purpose. Preview crawlers parse the image
 * URL with a stricter scanner than a browser, and an unencoded comma inside the path is a known
 * way to get "image could not be downloaded" back from Meta's fetcher while the card still ships
 * — with no thumbnail. Cloudinary treats `%2C`/`%3A` exactly like `,`/`:`: same derivative, same
 * bytes (verified 2026-10-02, 130,325 B both ways), so encoding costs nothing and removes the
 * ambiguity. Keep the encoding if you touch this line.
 */
const SHARE_IMAGE_TRANSFORM = `f_jpg%2Cg_auto%2Cq_auto%3Agood%2Cc_fill%2Cw_${OG_IMAGE_WIDTH}%2Ch_${OG_IMAGE_HEIGHT}`

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

/**
 * Entry for `openGraph.images`: the preview URL, plus its pixels when we control the crop.
 *
 * `secureUrl` repeats the same URL under Meta's dedicated `og:image:secure_url` tag, which the
 * older readers of the spec look for; it is only ever filled with an `https://` URL so the tag can
 * never advertise a plaintext variant that does not exist (in local dev the API host is `http://`).
 */
type ShareImage = { url: string; secureUrl?: string; alt?: string; width?: number; height?: number; type?: string }

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
  if (url.startsWith('https://')) entry.secureUrl = url
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
