import type { Metadata } from 'next'
import MarketingPage from '@/components/MarketingPage'
import { whatsappLink } from '@/lib/contact'

// Quadro 2 | Como funciona — copy from the Miro board `21/09/26 RETOMADA`. The words are the board's
// (owner: "estou lhe passando o texto… formatar bem em cada capítulo"); only the layout is ours, and
// the six steps keep the board's order and wording.
export const metadata: Metadata = {
  title: 'Como funciona | Alugue na Hora',
  description:
    'Do primeiro clique ao contrato assinado: encontre seu imóvel, agende a visita, envie a proposta e assine digitalmente pelo Alugue na Hora.',
}

const STEPS = [
  {
    title: 'Encontre seu imóvel',
    description: 'Pesquise por localização, tipo de imóvel, valor e características.',
  },
  {
    title: 'Agende uma visita',
    description: 'Escolha o melhor dia e horário para conhecer o imóvel.',
  },
  {
    title: 'Envie sua proposta',
    description: 'Gostou? Demonstre seu interesse e faça sua proposta.',
  },
  {
    title: 'Envie seus documentos',
    description: 'A documentação necessária para análise poderá ser enviada digitalmente.',
  },
  {
    title: 'Acompanhe a análise e assinatura',
    description: 'Acompanhe o andamento da análise e as próximas etapas.',
  },
  {
    title: 'Assine o contrato',
    description: 'Com tudo aprovado, o contrato é preparado e assinado digitalmente.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <MarketingPage
      kicker="Como funciona"
      title="Do primeiro clique ao contrato assinado."
      lead="O Alugue na Hora conecta quem procura um imóvel a proprietários, corretores e imobiliárias parceiras, reunindo oportunidades de locação em um único lugar — tornando o processo mais simples, ágil e digital."
      actions={[
        { label: 'Quero alugar um imóvel', href: '/imoveis' },
        {
          label: 'Quero falar com corretor(a) de imóveis',
          href: whatsappLink(
            'Olá! Vim pelo site da Alugue na Hora e gostaria de falar com um corretor(a) de imóveis para alugar um imóvel.'
          ),
          variant: 'secondary',
        },
      ]}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Para quem quer alugar</h2>
        <p className="mt-4 text-lg font-semibold text-slate-900">Encontre seu imóvel sem complicação.</p>
        <p className="mt-2 text-base leading-7 text-slate-600">
          Pesquise os imóveis disponíveis, escolha o que atende às suas necessidades e faça tudo pelo processo de
          locação de forma simples:
        </p>

        <ol className="mt-10 space-y-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-7 text-slate-900">{step.title}</h3>
                <p className="mt-1 text-base leading-7 text-slate-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </MarketingPage>
  )
}
