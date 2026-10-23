import type { Metadata } from 'next'
import MarketingPage, { MarketingCheckList, MarketingProse, MarketingSection } from '@/components/MarketingPage'
import { whatsappLink } from '@/lib/contact'

// Quadro 4 | Sou proprietário · Quero Alugar — copy from the Miro board `21/09/26 RETOMADA`,
// formatted but not rewritten. The nine deliverables and the 60-day exclusivity are the board's.
export const metadata: Metadata = {
  title: 'Sou proprietário(a) | Alugue na Hora',
  description:
    'Anuncie seu imóvel para locação com o Alugue na Hora: captação, divulgação, visitas, análise do inquilino, contrato e assinatura digital. Exclusividade de 60 dias.',
}

const DELIVERABLES = [
  'Captação do imóvel, com fotos, vídeos e a preparação do anúncio',
  'Divulgação profissional no Alugue na Hora e em nossos canais',
  'Análise inicial para registrar as condições do imóvel',
  'Atendimento aos interessados e organização das visitas',
  'Análise do futuro inquilino e da documentação',
  'Envio da proposta entre proprietário e interessado',
  'Elaboração do contrato de locação',
  'Assinatura digital, trazendo mais facilidade para todas as partes',
  'Acompanhamento até a conclusão da locação',
]

export default function ProprietariosPage() {
  return (
    <MarketingPage
      kicker="Sou proprietário(a)"
      title="Seu imóvel alugado com mais praticidade, segurança e rentabilidade."
      lead="Para locação com o Alugue na Hora. A partir da parceria, seu imóvel fica conosco em exclusividade por 60 dias, período em que cuidamos de todo o processo para encontrar o inquilino ideal."
      actions={[
        { label: 'Quero alugar meu imóvel', href: '/registro/proprietario' },
        {
          label: 'Quero falar com corretor(a) de imóveis',
          href: whatsappLink(
            'Olá! Vim pelo site da Alugue na Hora, sou proprietário(a) e gostaria de alugar meu imóvel.'
          ),
          variant: 'secondary',
        },
      ]}
    >
      <MarketingSection number="01" title="Você recebe">
        <MarketingCheckList items={DELIVERABLES} />
      </MarketingSection>

      <MarketingSection number="02" title="Como funciona?" badge="Exclusividade de 60 dias">
        <MarketingProse>
          <p className="text-lg leading-8 text-slate-700">
            Você disponibiliza o imóvel. O Alugue na Hora cuida do caminho até a locação.
          </p>
          <p>Mais divulgação, menos preocupação e mais chances de alugar.</p>
        </MarketingProse>
      </MarketingSection>
    </MarketingPage>
  )
}
