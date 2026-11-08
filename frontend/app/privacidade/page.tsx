import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Alugue na Hora',
  description: 'Como o Alugue na Hora trata os dados pessoais de proprietários, corretores e imobiliárias.',
}

const SECTIONS = [
  {
    title: '1. Quais dados coletamos',
    body: 'No cadastro coletamos os dados necessários para identificar o anunciante e validar o registro profissional: nome ou razão social, CPF ou CNPJ, RG, data de nascimento, CRECI, endereço, e-mail e telefones. Nos anúncios, coletamos os dados do imóvel, incluindo fotos, vídeos e localização. Também registramos dados técnicos de acesso, como endereço IP e páginas visitadas.',
  },
  {
    title: '2. Para que usamos',
    body: 'Usamos os dados para criar e manter a conta, validar o registro profissional de corretores e imobiliárias, publicar e administrar anúncios, permitir o contato entre anunciante e interessado, enviar comunicações sobre a conta e melhorar a plataforma.',
  },
  {
    title: '3. Base legal',
    body: 'O tratamento se apoia na execução do contrato de uso da plataforma, no cumprimento de obrigações legais, no legítimo interesse para segurança e prevenção a fraudes, e no consentimento quando ele é solicitado, por exemplo para comunicações de divulgação.',
  },
  {
    title: '4. Compartilhamento',
    body: 'Os dados de contato do anunciante ficam visíveis no anúncio, porque é assim que o interessado consegue falar com ele. Fora disso, compartilhamos dados apenas com prestadores que operam a plataforma (hospedagem, armazenamento de imagens e envio de e-mails) e com autoridades quando houver obrigação legal.',
  },
  {
    title: '5. Retenção e segurança',
    body: 'Os dados são mantidos enquanto a conta existir ou pelo prazo necessário para cumprir obrigações legais. Adotamos controle de acesso, senhas criptografadas e conexões seguras, e restringimos o acesso interno aos dados ao mínimo necessário.',
  },
  {
    title: '6. Seus direitos',
    body: 'Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, além de revogar consentimentos. Basta enviar o pedido para o e-mail de contato abaixo; a resposta é dada nos prazos da LGPD.',
  },
  {
    title: '7. Cookies',
    body: 'Usamos cookies e armazenamento local para manter a sessão autenticada e lembrar preferências. Sem eles a área do anunciante não funciona. Cookies de medição, quando existirem, são informados nesta página.',
  },
  {
    title: '8. Contato',
    body: 'Para exercer seus direitos ou esclarecer dúvidas sobre este documento, escreva para contato@aluguenahora.com.br.',
  },
]

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
      <p className="text-base font-bold uppercase tracking-[0.14em] text-secondary">Documento legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Esta política explica quais dados o Alugue na Hora coleta, por que coleta e como o titular pode
        exercer os seus direitos, conforme a Lei Geral de Proteção de Dados (LGPD).
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
        Versão inicial, em revisão jurídica. Enquanto o texto definitivo não é publicado, pedidos
        relacionados a dados pessoais podem ser enviados para contato@aluguenahora.com.br.
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Veja também os{' '}
        <Link href="/termos" className="font-semibold text-primary hover:underline">
          Termos de Uso
        </Link>
        .
      </p>
    </main>
  )
}
