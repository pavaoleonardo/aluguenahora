// Account profiles of Alugue na Hora (2 types only — see SPEC.md §3).
// Shared by the ANUNCIAR hover window (Navbar) and the ENTRAR modal (LoginModal),
// which the Miro board (21/09/26 RETOMADA) defines as "the same model".

export type UserProfileId = 'proprietario' | 'corretor'

export interface UserProfileOption {
  id: UserProfileId
  title: string
  description: string
  registerHref: string
}

export const USER_PROFILES: UserProfileOption[] = [
  {
    id: 'proprietario',
    title: 'Sou proprietário(a)',
    description: 'Anuncie seu próprio imóvel diretamente na plataforma',
    registerHref: '/registro/proprietario',
  },
  {
    id: 'corretor',
    title: 'Sou corretor(a) / imobiliária',
    description: 'Anuncie imóveis de seus clientes e gerencie sua carteira',
    registerHref: '/registro/corretor',
  },
]
