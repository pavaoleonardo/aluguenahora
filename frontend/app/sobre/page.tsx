// Copy approved by the owner on the Miro board "21/09/26 RETOMADA" — frame "Quadro 1 | Sobre nós".
// It replaces the previous generic text (mission + manual verification) verbatim, per the owner:
// "estou lhe passando o texto… formatar bem em cada capítulo".
export default function AboutPage() {
    return (
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-primary">Sobre nós</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Alugue na Hora</h1>
          <p className="mt-6 text-xl leading-8">
            O Alugue na Hora é uma plataforma imobiliária especializada em locação, criada para tornar o processo de alugar um imóvel mais simples, rápido e seguro. Conectamos quem procura um imóvel a proprietários, corretores (as) de imóveis e imobiliárias parceiras, facilitando todas as etapas da locação — da divulgação e atendimento à formalização do contrato.
          </p>
          <p className="mt-12 text-2xl font-bold tracking-tight text-secondary sm:text-3xl">
            Encontrou. Gostou. Alugue na Hora.
          </p>
        </div>
      </div>
    )
  }
