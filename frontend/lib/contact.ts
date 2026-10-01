/**
 * Public contact channels for Alugue na Hora.
 *
 * Default number: the owner's line supplied by the client, +55 67 99115-5100.
 * `NEXT_PUBLIC_WHATSAPP` overrides it without a code change; because it is inlined
 * at build time (same convention as `lib/apiBase.ts`), an override has to be in
 * `frontend/.env.local` both on the build machine and on the VPS.
 *
 * Format: digits only, country + area code first, e.g. `5567991155100`.
 */
const DEFAULT_WHATSAPP_NUMBER = '5567991155100'

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '')

/** Builds a wa.me deep link pre-filled with `message`. */
export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message)
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : `https://wa.me/?text=${text}`
}
