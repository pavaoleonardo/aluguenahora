import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Shared shell for the three institutional pages defined by the Miro board `21/09/26 RETOMADA`
 * (Quadro 2 | Como funciona, Quadro 4 | Sou proprietário, Quadro 3 | Sou corretor(a) / Imobiliária).
 *
 * Same visual language as `app/sobre/page.tsx` (Quadro 1): brand wash, ruled kicker, one heading and
 * the copy in a narrow measure — the board's paragraphs are long, so a 3xl column keeps them readable.
 * Nothing here is client-side; all three pages are static server components.
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

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Kicker: uppercase, tracked and ruled, the same label device /sobre uses. */}
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-secondary" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary sm:text-sm">
              {kicker}
            </span>
          </div>

          {/* One type scale for every Quadro page: the headline is large, normal-weight and tightly
              tracked so it always out-weighs the lead below it. The lead is deliberately smaller and
              muted — growing it back is exactly what made the titles look small the first time. */}
          <h1 className="mt-8 text-[2.65rem] leading-[1.05] font-normal tracking-[-0.04em] text-slate-900 sm:text-6xl sm:leading-[1.02] lg:text-[4.5rem]">
            {title}
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-slate-500 sm:mt-9 sm:text-lg sm:leading-8">{lead}</p>

          {children ? (
            <div className="mt-16 space-y-16 border-t border-slate-100 pt-12 sm:mt-20 sm:space-y-20 sm:pt-16">
              {children}
            </div>
          ) : null}

          {actions.length > 0 ? (
            <div className="mt-14 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:flex-wrap sm:gap-4">
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
    </div>
  )
}
