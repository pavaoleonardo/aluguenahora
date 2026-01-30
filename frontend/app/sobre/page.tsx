export default function AboutPage() {
    return (
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-primary">Sobre Nós</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Alugue Na Hora</h1>
          <p className="mt-6 text-xl leading-8">
            Somos uma plataforma dedicada a conectar proprietários e inquilinos de Campo Grande - MS, oferecendo um processo seguro, ágil e transparente.
          </p>
          <div className="mt-10 max-w-2xl bg-slate-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nossa Missão</h2>
            <p className="mt-6 text-gray-600">
              Facilitar o acesso à moradia de qualidade, garantindo que cada imóvel listado em nossa plataforma atenda a rigorosos padrões de segurança e conforto.
            </p>
          </div>
          <p className="mt-8">
            Diferente de outros classificados, aqui <strong>cada imóvel é verificado manualmente</strong> por nossa equipe antes de ser publicado. Isso garante que você não perca tempo com anúncios falsos ou imóveis em más condições.
          </p>
        </div>
      </div>
    )
  }
