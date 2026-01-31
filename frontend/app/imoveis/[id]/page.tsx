import PropertyDetailClient from '@/components/PropertyDetailClient'

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  return <PropertyDetailClient id={params.id} />
}
