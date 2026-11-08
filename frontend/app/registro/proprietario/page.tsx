import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'
import { REGISTER_PROPRIETARIO } from '@/lib/registerProfiles'

export const metadata: Metadata = {
  title: 'Cadastro de Proprietario | Alugue na Hora',
  description: 'Cadastre-se como proprietario e anuncie seu imovel no Alugue na Hora.',
}

export default function RegisterProprietarioPage() {
  return <RegisterForm profile={REGISTER_PROPRIETARIO} />
}
