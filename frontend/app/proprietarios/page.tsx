import type { Metadata } from 'next'
import { CheckIcon } from '@heroicons/react/24/outline'
import MarketingPage from '@/components/MarketingPage'
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Você recebe</h2>
        <ul role="list" className="mt-8 space-y-4">
          {DELIVERABLES.map((item) => (
            <li key={item} className="flex gap-4">
              <CheckIcon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-secondary" />
              <span className="text-base leading-7 text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Como funciona?</h2>
          <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
            Exclusividade de 60 dias
          </span>
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          Você disponibiliza o imóvel. O Alugue na Hora cuida do caminho até a locação.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Mais divulgação, menos preocupação e mais chances de alugar.
        </p>
      </div>
    </MarketingPage>
  )
}
