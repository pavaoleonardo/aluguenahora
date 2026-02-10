export type NoticiaData = {
  id: number
  documentId: string
  titulo: string
  resumo: string
  conteudo: string
  link?: string
  categoria: string
  data: string
  imagem?: {
    url: string
  }
}

export const initialNews: NoticiaData[] = [
  {
    id: 101,
    documentId: 'bairro-sao-francisco-lidera-valorizacao',
    titulo: 'Bairro São Francisco lidera valorização imobiliária em Campo Grande com alta de 35%',
    resumo: 'Com infraestrutura consolidada e localização privilegiada, o bairro se destaca como o principal polo de valorização na capital sul-mato-grossense em 2025.',
    conteudo: 'O mercado imobiliário de Campo Grande vive um momento de forte valorização, e o bairro São Francisco é o grande destaque deste ciclo. Segundo pesquisas recentes, o bairro registrou um aumento médio de 35% no valor do metro quadrado apenas no último ano.\n\nA proximidade com o centro, a presença de serviços de alta qualidade e o perfil residencial de alto padrão têm atraído investidores e famílias que buscam solidez e qualidade de vida. Outros bairros como Planalto e Jardim dos Estados também seguem em ritmo acelerado de crescimento, consolidando a Capital como um dos melhores destinos para investimento imobiliário no Centro-Oeste.',
    categoria: 'Valorização',
    data: '2026-02-10',
    imagem: { url: '/news/sao-francisco.png' }
  },
  {
    id: 102,
    documentId: 'estoque-de-imoveis-pode-esgotar',
    titulo: 'Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses',
    resumo: 'O aquecimento do mercado imobiliário na Capital atinge níveis recordes, impulsionado pela facilidade de crédito e novos lançamentos.',
    conteudo: 'A velocidade de vendas em Campo Grande atingiu patamares nunca antes vistos. Se o ritmo atual de comercialização for mantido e não houver novos lançamentos expressivos, o estoque atual de imóveis prontos e na planta pode se esgotar em menos de 120 dias.\n\nEste cenário é reflexo de uma combinação de fatores: a redução das taxas de juros em linhas de crédito específicas, o aumento do poder de compra regional impulsionado pelo agronegócio e a busca por ativos reais como forma de proteção patrimonial. Especialistas recomendam que compradores fiquem atentos às oportunidades, pois a tendência é de continuidade na alta dos preços devido à escassez de oferta.',
    categoria: 'Investimento',
    data: '2026-02-08',
    imagem: { url: '/news/mercado-cg.png' }
  },
  {
    id: 103,
    documentId: 'agronegocio-impulsiona-mercado-ms',
    titulo: 'Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS',
    resumo: 'O setor imobiliário do estado vive um momento de forte expansão, atraindo investidores de todo o Brasil interessados na solidez econômica regional.',
    conteudo: 'Mato Grosso do Sul consolidou sua posição como um dos estados mais dinâmicos do Brasil para o setor imobiliário. O sucesso recorde das safras e a expansão das fronteiras agrícolas têm gerado um excedente de capital que está sendo reinvestido massivamente em imóveis urbanos e rurais.\n\nAlém disso, os grandes projetos de infraestrutura, como a Rota Bioceânica, estão criando novos polos de desenvolvimento no interior do estado, como em Porto Murtinho e Ribas do Rio Pardo. Em Campo Grande, o reflexo é visto em lançamentos de luxo e na modernização da rede hoteleira e de serviços, atraindo olhares de grandes incorporadoras nacionais que antes focavam apenas no eixo Rio-São Paulo.',
    categoria: 'Alta Demanda',
    data: '2026-02-05',
    imagem: { url: '/news/agronegocio-ms.png' }
  }
]
