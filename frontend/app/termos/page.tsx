import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso | Alugue na Hora',
  description: 'Condições de uso da plataforma Alugue na Hora.',
}

const SECTIONS = [
  {
    title: '1. Objeto',
    body: 'O Alugue na Hora é uma plataforma digital que aproxima proprietários, corretores de imóveis e imobiliárias de pessoas interessadas em alugar imóveis. A plataforma não é parte na negociação de locação: o contato, a visita e o contrato acontecem diretamente entre o anunciante e o interessado.',
  },
  {
    title: '2. Cadastro e conta',
    body: 'Para anunciar é preciso criar uma conta com dados verdadeiros, completos e atualizados. O cadastro de corretores e imobiliárias é analisado antes da liberação e pode ser recusado quando o registro profissional não for confirmado. A senha é pessoal e intransferível, e o titular responde pelas atividades realizadas na sua conta.',
  },
  {
    title: '3. Responsabilidades do anunciante',
    body: 'O anunciante declara ser o proprietário do imóvel ou ter autorização expressa para divulgá-lo e intermediá-lo, e compromete-se a manter disponibilidade, valores e condições corretos. Anúncios com informações falsas, imóveis inexistentes ou cobrança de valores não informados podem ser removidos.',
  },
  {
    title: '4. Conteúdo dos anúncios',
    body: 'Fotos, textos e demais conteúdos enviados são de responsabilidade de quem os publica, que garante ter os direitos necessários para usá-los. Ao publicar, o anunciante autoriza a exibição desse conteúdo na plataforma e nos canais de divulgação do Alugue na Hora, sempre vinculados ao anúncio.',
  },
  {
    title: '5. Uso indevido',
    body: 'É vedado usar a plataforma para finalidades ilícitas, publicar conteúdo ofensivo ou discriminatório, coletar dados de terceiros, tentar acessar áreas restritas ou sobrecarregar a infraestrutura. O descumprimento pode levar à suspensão ou ao encerramento da conta.',
  },
  {
    title: '6. Propriedade intelectual',
    body: 'A marca, o layout, os textos institucionais e o código da plataforma pertencem ao Alugue na Hora e não podem ser reproduzidos sem autorização. O conteúdo enviado pelo anunciante continua sendo dele.',
  },
  {
    title: '7. Alterações e contato',
    body: 'Estes termos podem ser atualizados para refletir mudanças na plataforma ou na legislação, com aviso na própria página. Dúvidas podem ser enviadas para contato@aluguenahora.com.br.',
  },
]

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <p className="text-base font-bold uppercase tracking-[0.14em] text-secondary">Documento legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl">Termos de Uso</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Estes termos descrevem as condições de uso da plataforma Alugue na Hora por proprietários,
        corretores de imóveis e imobiliárias.
      </p>

      <div className="mt-10 space-y-7">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
        Versão inicial, em revisão jurídica. Enquanto o texto definitivo não é publicado, dúvidas podem
        ser enviadas para contato@aluguenahora.com.br.
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Veja também a{' '}
        <Link href="/privacidade" className="font-semibold text-primary hover:underline">
          Política de Privacidade
        </Link>
        .
      </p>
    </main>
  )
}
