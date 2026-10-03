// Copy approved by the owner on the Miro board "21/09/26 RETOMADA" — frame "Quadro 1 | Sobre nós".
// The text is verbatim from that frame (owner: "estou lhe passando o texto… formatar bem em cada
// capítulo"); only the layout is ours: the "Sobre nós" kicker and the brand name form one lockup, and
// the slogan closes the page stacked one line per phrase (owner's request — inline it read poorly).
export default function AboutPage() {
    return (
      <div className="relative isolate overflow-hidden bg-white">
        {/* Soft brand wash — same blurred-blob device as the news section on the home page. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]">
          <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-secondary blur-[120px]" />
          <div className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary blur-[120px]" />
        </div>

        <section className="px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Kicker: uppercase, tracked and ruled, so it reads as a deliberate label instead of a
                tiny line trailing the heading. */}
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-secondary" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary sm:text-sm">
                Sobre nós
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Alugue na Hora
            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-600 sm:mt-10 sm:text-xl sm:leading-9">
              O Alugue na Hora é uma plataforma imobiliária especializada em locação, criada para tornar o processo de alugar um imóvel mais simples, rápido e seguro. Conectamos quem procura um imóvel a proprietários, corretores (as) de imóveis e imobiliárias parceiras, facilitando todas as etapas da locação — da divulgação e atendimento à formalização do contrato.
            </p>

            {/* Signature: one phrase per line, tied to the copy above by a brand gradient rule. */}
            <div className="mt-16 flex gap-6 border-t border-slate-100 pt-10 sm:mt-20 sm:gap-8">
              <span aria-hidden="true" className="w-1 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary" />
              <p className="text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                <span className="block">Encontrou.</span>
                <span className="block">Gostou.</span>
                <span className="block text-secondary">Alugue na Hora.</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
