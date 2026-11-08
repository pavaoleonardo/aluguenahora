import type { Metadata } from 'next'
import RegisterForm from '@/components/RegisterForm'
import { REGISTER_CORRETOR } from '@/lib/registerProfiles'

export const metadata: Metadata = {
  title: 'Cadastro de Corretor de Imóveis | Alugue na Hora',
  description:
    'Cadastre-se como corretor de imóveis no Alugue na Hora e anuncie sua carteira com seguranca.',
}

export default function RegisterCorretorPage() {
  return <RegisterForm profile={REGISTER_CORRETOR} />
}
