import PropertyDetailClient from '@/components/PropertyDetailClient'
import { Metadata } from 'next'
import { api } from '@/lib/api'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // Attempt to fetch property to construct a dynamic, beautiful browser tab title
    let property = null;
    try {
      const res = await api.get(`/api/imoveis/${id}`, { params: { populate: '*' } });
      property = res.data?.data;
    } catch {
      // Fallback search by documentId if ID fetch fails
      const res = await api.get('/api/imoveis', { 
        params: { 'filters[documentId][$eq]': id, 'filters[status][$in]': ['published', 'draft'] } 
      });
      property = res.data?.data?.[0];
    }

    if (property) {
      const finalidade = property.finalidade === 'aluguel' ? 'Aluguel' : 'Venda';
      const tipo = property.tipo || 'Imóvel';
      const cidade = property.cidade || 'Campo Grande';
      const estado = 'MS'; // As the app is focused on MS
      const bairro = typeof property.bairro === 'string' ? property.bairro : property.bairro?.bairro || '';
      
      // Infoimóveis style format: "Venda - Apartamento - MS - Campo Grande - Tiradentes"
      const breadcrumbTitle = `${finalidade} - ${tipo}${estado ? ` - ${estado}` : ''}${cidade ? ` - ${cidade}` : ''}${bairro ? ` - ${bairro}` : ''}`;

      return {
        title: `${breadcrumbTitle} | Alugue na Hora`,
        description: property.titulo,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: 'Detalhes do Imóvel | Alugue na Hora'
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />
}
