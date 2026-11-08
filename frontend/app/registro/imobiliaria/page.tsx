import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'
import { REGISTER_IMOBILIARIA } from '@/lib/registerProfiles'

export const metadata: Metadata = {
  title: 'Cadastro de Imobiliaria | Alugue na Hora',
  description:
    'Cadastre sua imobiliaria no Alugue na Hora e administre o portfolio da sua equipe.',
}

export default function RegisterImobiliariaPage() {
  return <RegisterForm profile={REGISTER_IMOBILIARIA} />
}
