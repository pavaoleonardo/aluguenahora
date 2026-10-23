import type { Metadata } from 'next'
import MarketingPage, { MarketingProse, MarketingSection, MarketingStatement } from '@/components/MarketingPage'
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
      <MarketingSection number="01" title="A parceria">
        <MarketingProse>
          <p>
            Por isso, criamos uma parceria que aproxima o Alugue na Hora aos corretores (as) de imóveis e
            imobiliárias, unindo imóveis, divulgação e novos negócios.
          </p>
          <p>
            A proposta é simples: ampliar os horizontes da locação. Seu imóvel ganha mais visibilidade, alcança
            novos interessados e aumenta suas possibilidades de aluguel — enquanto você mantém sua carteira, seu
            relacionamento com o proprietário e a administração do imóvel.
          </p>
        </MarketingProse>
      </MarketingSection>

      <MarketingSection number="02" title="Na Hora Conecta">
        <MarketingProse>
          <p>
            O Na Hora Conecta é a rede de parceiros do Alugue na Hora. Você disponibiliza seus imóveis em nossa
            plataforma e nós trabalhamos para ampliar sua divulgação e gerar novos negócios.
          </p>
          <p>
            Seu imóvel é alugado por meio do Alugue na Hora, compartilhamos os honorários da locação entre os
            parceiros do Na Hora Conecta. Nós acreditamos e valorizamos o seu trabalho — e levamos seus imóveis
            mais longe.
          </p>
        </MarketingProse>

        <MarketingStatement lines={['Mais alcance.', 'Mais clientes.', 'Mais locação.']} />
      </MarketingSection>
    </MarketingPage>
  )
}
