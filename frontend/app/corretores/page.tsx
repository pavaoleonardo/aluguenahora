import type { Metadata } from 'next'
import MarketingPage from '@/components/MarketingPage'
import { whatsappLink } from '@/lib/contact'

// Quadro 3 | Sou corretor(a) / Imobiliária — copy from the Miro board `21/09/26 RETOMADA`.
// Fixes applied to the board's typos only ("ampliar as horizontes" → "os", "seu carteira" → "sua
// carteira"); the closing line of the Na Hora Conecta block was garbled on the board, so it keeps
// the readable part of its meaning ("levamos seus imóveis mais longe") instead of inventing new copy.
export const metadata: Metadata = {
  title: 'Sou corretor(a) / imobiliária | Alugue na Hora',
  description:
    'Na Hora Conecta é a rede de parceiros do Alugue na Hora: disponibilize seus imóveis, amplie a divulgação e gere novos negócios mantendo sua carteira.',
}

export default function CorretoresPage() {
  return (
    <MarketingPage
      kicker="Sou corretor(a) / imobiliária"
      title="Seus imóveis, mais oportunidades, novos negócios."
      lead="O Alugue na Hora nasceu para tornar a locação de imóveis mais simples, ágil e conectada. Mas acreditamos que novas oportunidades surgem quando mais profissionais do mercado imobiliário trabalham juntos."
      actions={[
        { label: 'Quero fazer parte do Na Hora Conecta', href: '/registro/corretor' },
        {
          label: 'Quero falar com corretor(a) de imóveis',
          href: whatsappLink(
            'Olá! Vim pelo site da Alugue na Hora, sou corretor(a) / imobiliária e gostaria de fazer parte do Na Hora Conecta.'
          ),
          variant: 'secondary',
        },
      ]}
    >
      <div className="space-y-6">
        <p className="text-base leading-7 text-slate-600">
          Por isso, criamos uma parceria que aproxima o Alugue na Hora aos corretores (as) de imóveis e
          imobiliárias, unindo imóveis, divulgação e novos negócios.
        </p>
        <p className="text-base leading-7 text-slate-600">
          A proposta é simples: ampliar os horizontes da locação. Seu imóvel ganha mais visibilidade, alcança
          novos interessados e aumenta suas possibilidades de aluguel — enquanto você mantém sua carteira, seu
          relacionamento com o proprietário e a administração do imóvel.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-secondary" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary sm:text-sm">
            Na Hora Conecta
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Seus imóveis, mais oportunidades, novos negócios.
        </h2>

        <p className="mt-5 text-base leading-7 text-slate-600">
          O Na Hora Conecta é a rede de parceiros do Alugue na Hora. Você disponibiliza seus imóveis em nossa
          plataforma e nós trabalhamos para ampliar sua divulgação e gerar novos negócios.
        </p>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Seu imóvel é alugado por meio do Alugue na Hora, compartilhamos os honorários da locação entre os
          parceiros do Na Hora Conecta. Nós acreditamos e valorizamos o seu trabalho — e levamos seus imóveis
          mais longe.
        </p>

        <p className="mt-8 border-t border-slate-200 pt-6 text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl">
          <span className="block">Mais alcance.</span>
          <span className="block">Mais clientes.</span>
          <span className="block text-secondary">Mais locação.</span>
        </p>
      </div>
    </MarketingPage>
  )
}
