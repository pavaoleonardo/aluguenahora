/**
 * Public contact channels for Alugue na Hora.
 *
 * Default number: the owner's line supplied by the client, +55 67 98115-5100.
 * `NEXT_PUBLIC_WHATSAPP` overrides it without a code change; because it is inlined
 * at build time (same convention as `lib/apiBase.ts`), an override has to be in
 * `frontend/.env.local` both on the build machine and on the VPS.
 *
 * Format: digits only, country + area code first, e.g. `5567981155100`.
 * Digest on WhatsApp rejecting a link with "phone number shared via url is invalid":
 * that error means the **number itself** is not registered on WhatsApp (or has a
 * wrong digit) — it is never a formatting problem, because everything below is
 * digits-only. That is exactly what happened on 2026-10-01: the client's line was
 * seeded as `…99115-5100` and the real one is `…98115-5100`.
 * To change it, edit `DEFAULT_WHATSAPP_NUMBER` (or set the env var) with the full
 * international number: 55 + DDD + number.
 */
const DEFAULT_WHATSAPP_NUMBER = '5567981155100'

/** Digits-only international number, e.g. `5567981155100`. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '')

/**
 * Human-readable form of `WHATSAPP_NUMBER` for visible copy:
 * `+55 (67) 98115-5100` for a mobile, `+55 (67) 9115-5100` for a fixed line.
 */
export function whatsappDisplayNumber(): string {
  if (WHATSAPP_NUMBER.length === 13) {
    // 55 + DDD (2) + 9 digits
    return `+${WHATSAPP_NUMBER.slice(0, 2)} (${WHATSAPP_NUMBER.slice(2, 4)}) ${WHATSAPP_NUMBER.slice(4, 9)}-${WHATSAPP_NUMBER.slice(9)}`
  }
  if (WHATSAPP_NUMBER.length === 12) {
    // 55 + DDD (2) + 8 digits
    return `+${WHATSAPP_NUMBER.slice(0, 2)} (${WHATSAPP_NUMBER.slice(2, 4)}) ${WHATSAPP_NUMBER.slice(4, 8)}-${WHATSAPP_NUMBER.slice(8)}`
  }
  return WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : ''
}

/** Builds a wa.me deep link pre-filled with `message`. */
export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message)
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : `https://wa.me/?text=${text}`
}

/**
 * Deep link that lets the visitor forward a message to **any** contact of their own
 * (no fixed recipient): WhatsApp opens with the text ready and asks who to send it to.
 * Used by the "Compartilhar" menu on the property page.
 */
export function whatsappShareLink(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

