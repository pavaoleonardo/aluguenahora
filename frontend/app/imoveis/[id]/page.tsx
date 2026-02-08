import PropertyDetailClient from '@/components/PropertyDetailClient'

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />
}
