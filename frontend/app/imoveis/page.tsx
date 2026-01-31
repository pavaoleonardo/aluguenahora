import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";

// Force dynamic rendering to avoid build-time fetches on Vercel
export const dynamic = 'force-dynamic';

type Imovel = {
  id: number;
  documentId: string;
  titulo: string;
  bairro: string | { bairro: string; regiao?: string };
  quartos: number;
  banheiros: number;
  preco: number;
  estatus: string;
  finalidade?: string;
  tipo?: string;
  fotos: any[]; // Depending on flatten response
};

async function getProperties() {
  try {
    const res = await api.get("/api/imoveis", {
      params: {
        populate: "fotos",
        "filters[publishedAt][$notNull]": true,
        sort: "createdAt:desc",
      },
      timeout: 5000,
    });
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function ImoveisPage() {
  const properties = await getProperties();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Imóveis Disponíveis</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore nossa seleção completa de imóveis aprovados e prontos para você.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {properties.map((property: Imovel) => {
            const bairroLabel =
              typeof property.bairro === 'string' ? property.bairro : property.bairro?.bairro;
            const finalidadeLabel =
              property.finalidade === 'aluguel'
                ? 'Aluguel'
                : property.finalidade === 'venda'
                  ? 'Venda'
                  : '';
            return (
             <Link key={property.id || property.documentId} href={`/imoveis/${property.documentId || property.id}`} className="group flex flex-col items-start justify-between hover:shadow-lg transition-shadow rounded-2xl p-4 bg-white border border-gray-100">
                <div className="relative w-full overflow-hidden rounded-xl bg-gray-200 aspect-[16/9]">
                  {property.fotos && property.fotos[0]?.url ? (
                    <Image
                      src={property.fotos[0]?.url}
                      alt={property.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      Sem Foto
                    </div>
                  )}
                  {finalidadeLabel ? (
                    <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white shadow">
                      {finalidadeLabel}
                    </span>
                  ) : null}
                </div>
                <div className="max-w-xl w-full">
                  <div className="mt-6 flex items-center gap-x-4 text-xs">
                    <span className="text-gray-500">{bairroLabel}</span>
                    <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                      Disponível
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary transition-colors">
                      {property.titulo}
                    </h3>
                    {property.tipo ? (
                      <p className="mt-1 text-sm text-gray-600">{property.tipo}</p>
                    ) : null}
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.preco || 0)}
                    </p>
                    <div className="mt-4 flex gap-4 text-sm text-gray-600">
                        <span>{property.quartos} Quartos</span>
                        <span>•</span>
                        <span>{property.banheiros} Banheiros</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
