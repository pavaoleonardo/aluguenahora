import type { ReactNode } from 'react'
import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/outline'

/**
 * Shared shell for the three institutional pages defined by the Miro board `21/09/26 RETOMADA`
 * (Quadro 2 | Como funciona, Quadro 4 | Sou proprietário, Quadro 3 | Sou corretor(a) / Imobiliária).
 *
 * One editorial type scale is reused by every page, so the three can no longer drift apart:
 *   kicker → 0.7rem, uppercase, 0.3em tracking, brand orange
 *   h1     → 3xl → 6xl, light weight, -0.03em tracking — the biggest thing on the page
 *   lead   → base/lg, slate-500 — deliberately *smaller* than the h1 (that inversion was the bug)
 *   h2     → 2xl/3xl, medium weight, next to a mono section number
 *   body   → base, leading-8, slate-600, 2xl measure
 * Geist Sans is self-hosted in `app/layout.tsx` (one variable file, wght 100–900), so the light
 * weights below cost no extra download. Nothing here is client-side.
 */
export interface MarketingAction {
  label: string
  href: string
  /** `primary` = orange CTA (same as the property page's QUERO ALUGAR); `secondary` = outlined. */
  variant?: 'primary' | 'secondary'
}

interface MarketingPageProps {
  kicker: string
  title: string
  lead: string
  actions?: MarketingAction[]
  children?: ReactNode
}

/** The type scale, in one place. Every page consumes these — never re-declare them inline. */
const KICKER = 'text-[0.7rem] font-medium uppercase leading-none tracking-[0.3em] text-secondary'
const H1 =
  'mt-7 text-[2.15rem] font-normal leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-5xl sm:font-light lg:text-6xl'
const LEAD = 'mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:mt-7 sm:text-lg sm:leading-9'
const H2 = 'text-2xl font-medium leading-tight tracking-[-0.02em] text-slate-900 sm:text-3xl'

const ACTION_CLASSES: Record<NonNullable<MarketingAction['variant']>, string> = {
  primary: 'bg-secondary text-white shadow-sm hover:bg-secondary/90',
  secondary: 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900',
}

export default function MarketingPage({ kicker, title, lead, actions = [], children }: MarketingPageProps) {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Soft brand wash — same blurred-blob device as /sobre and the home news section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]">
        <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-secondary blur-[120px]" />
        <div className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary blur-[120px]" />
      </div>

      <section className="px-6 pb-12 pt-20 sm:pb-14 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Kicker: uppercase, tracked and ruled — the label device /sobre uses. */}
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-secondary" />
            <span className={KICKER}>{kicker}</span>
          </div>

          <h1 className={H1}>{title}</h1>

          <p className={LEAD}>{lead}</p>

          {actions.length > 0 ? (
            <div className="mt-10 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:gap-4">
              {actions.map((action) => {
                const className = `inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-bold transition-colors duration-300 ${ACTION_CLASSES[action.variant ?? 'primary']}`

                // The board's "FALAR COM CORRETOR(A)" buttons are WhatsApp deep links, not routes.
                return action.href.startsWith('http') ? (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link key={action.label} href={action.href} className={className}>
                    {action.label}
                  </Link>
                )
              })}
            </div>
          ) : null}

        </div>
      </section>

      {/* Body sections are siblings of the hero, not nested inside it, so each one is its own
          `<section>` landmark with its own heading. */}
      {children ? (
        <section className="px-6 pb-24 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-14 border-t border-slate-200/70 pt-12 sm:space-y-16 sm:pt-14">
            {children}
          </div>
        </section>
      ) : null}
    </div>
  )
}

interface MarketingSectionProps {
  /** Two-digit section number (`01`, `02`…), set in the mono face. */
  number?: string
  title: string
  /** Small pill next to the heading (e.g. "Exclusividade de 60 dias"). */
  badge?: string
  /** Optional one-line introduction, in the muted colour. */
  intro?: string
  children?: ReactNode
}

/** Uniform body section: mono number + heading (+ badge), optional intro, then the content. */
export function MarketingSection({ number, title, badge, intro, children }: MarketingSectionProps) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        {number ? (
          <span aria-hidden="true" className="font-mono text-xs leading-none tracking-[0.2em] text-secondary">
            {number}
          </span>
        ) : null}
        <h2 className={H2}>{title}</h2>
        {badge ? (
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary">
            {badge}
          </span>
        ) : null}
      </div>

      {intro ? <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">{intro}</p> : null}

      {children ? <div className="mt-9">{children}</div> : null}
    </section>
  )
}

/** Running prose — the same measure and rhythm whenever a section is only paragraphs. */
export function MarketingProse({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl space-y-5 text-base leading-8 text-slate-600">{children}</div>
}

interface Step {
  title: string
  description: string
}

/** Numbered steps (Quadro 2) — hairline-ruled, two columns from `sm` up. */
export function MarketingStepList({ items }: { items: Step[] }) {
  return (
    <ol className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-4 border-t border-slate-200/80 pt-5">
          <span aria-hidden="true" className="pt-1 font-mono text-xs leading-none text-secondary">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-base font-medium leading-6 text-slate-900">{item.title}</h3>
            <p className="mt-1 text-[0.95rem] leading-7 text-slate-500">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Checked deliverables (Quadro 4) — the same hairline rhythm as the step list. */
export function MarketingCheckList({ items }: { items: string[] }) {
  return (
    <ul role="list" className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-t border-slate-200/80 pt-4">
          <CheckIcon aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-secondary" />
          <span className="text-[0.95rem] leading-7 text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Closing display lines (Quadro 3's "Mais alcance…") — light type, last line in brand orange. */
export function MarketingStatement({ lines }: { lines: string[] }) {
  return (
    <p className="mt-10 border-t border-slate-200/80 pt-8 text-2xl font-light leading-[1.25] tracking-[-0.02em] text-slate-900 sm:text-3xl">
      {lines.map((line, index) => (
        <span key={line} className={`block ${index === lines.length - 1 ? 'text-secondary' : ''}`}>
          {line}
        </span>
      ))}
    </p>
  )
}
