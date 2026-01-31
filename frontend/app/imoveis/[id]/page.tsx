import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import PropertyGallery from "@/components/PropertyGallery";

// Fetch property by Document ID (Strapi 5 standard) or ID depending on how user navigates
// For Strapi 5, `documentId` is preferred for stable ID. URL /imoveis/[id] probably uses documentId.
async function getProperty(id: string) {
  try {
    const res = await api.get(`/api/imoveis/${id}`, {
      params: {
        populate: "fotos",
      },
    });
    return res.data.data;
  } catch (error) {
    // Fallback to find by documentId (works even if findOne is not public)
    try {
      const res = await api.get(`/api/imoveis`, {
        params: {
          populate: "fotos",
          "filters[documentId][$eq]": id,
          "filters[publishedAt][$notNull]": true,
        },
      });
      const data = res.data.data;
      return Array.isArray(data) ? data[0] : data || null;
    } catch (fallbackError) {
      console.error("Error fetching property:", fallbackError);
      return null;
    }
  }
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  const bairroLabel =
    typeof property.bairro === 'string' ? property.bairro : property.bairro?.bairro;
  const finalidadeLabel =
    property.finalidade === 'aluguel'
      ? 'Aluguel'
      : property.finalidade === 'venda'
        ? 'Venda'
        : '';
  
  // Handle rich text description (blocks) or plain text
  const renderDescription = () => {
      // If it's rich text (array of blocks)
      if (Array.isArray(property.descricao)) {
          return property.descricao.map((block: any, i: number) => {
              if (block.type === 'paragraph') {
                  return <p key={i} className="mb-4">{block.children.map((c: any) => c.text).join('')}</p>
              }
              return null
          })
      }
      return <p>{property.descricao}</p>
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <PropertyGallery
            fotos={property.fotos}
            titulo={property.titulo}
            finalidadeLabel={finalidadeLabel}
          />

          {/* Property Info */}
          <div className="mt-10 lg:mt-0 lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{property.titulo}</h1>
            <p className="mt-4 text-2xl font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.preco || 0)}
            </p>
            {finalidadeLabel ? (
              <span className="mt-2 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                {finalidadeLabel}
              </span>
            ) : null}
            
            <div className="mt-4 border-t border-b border-gray-200 py-4 flex items-center justify-between text-sm text-gray-500">
                 <span>{bairroLabel}</span>
                 <div className="flex gap-4">
                     <span>{property.quartos} Quartos</span>
                     <span>{property.banheiros} Banheiros</span>
                     <span>{property.tamanho} m²</span>
                 </div>
            </div>
            {property.tipo ? (
              <p className="mt-3 text-sm text-gray-600">Tipo: {property.tipo}</p>
            ) : null}

            <div className="mt-6 space-y-6 text-base text-gray-700">
                {renderDescription()}
            </div>

            <div className="mt-10 flex gap-4">
                <button className="flex-1 rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Tenho Interesse
                </button>
                <Link href="/imoveis" className="flex-1 rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Voltar para Lista
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
