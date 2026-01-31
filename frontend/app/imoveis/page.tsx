import PropertyGrid from "@/components/PropertyGrid";

export default function ImoveisPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Imóveis Disponíveis</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore nossa seleção completa de imóveis aprovados e prontos para você.
          </p>
        </div>
        <PropertyGrid emptyMessage="Nenhum imóvel disponível no momento." />
      </div>
    </div>
  );
}
