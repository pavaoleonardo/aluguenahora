// Account profiles of Alugue na Hora (3 types — see SPEC.md §3).
// Shared by the ANUNCIAR hover window (Navbar), the mobile drawer and the ENTRAR
// modal (LoginModal): every one of them maps over USER_PROFILES, so adding a
// profile here is the only edit a new account type needs.

export type UserProfileId = 'proprietario' | 'corretor' | 'imobiliaria'

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
    title: 'Sou corretor(a)',
    description: 'Anuncie imóveis de seus clientes e gerencie sua carteira',
    registerHref: '/registro/corretor',
  },
  {
    id: 'imobiliaria',
    title: 'Sou imobiliária',
    description: 'Cadastre sua imobiliária e administre o portfólio da equipe',
    registerHref: '/registro/imobiliaria',
  },
]
