// Entries of the "Alugue na hora" dropdown (Miro board 21/09/26 RETOMADA: Quadro 1 | Sobre nós,
// Quadro 2 | Como funciona, Quadro 4 | Sou proprietário, Quadro 3 | Sou corretor(a) / Imobiliária).
// Shared by the desktop hover window and the mobile drawer in Navbar.tsx so the two surfaces
// cannot drift apart. Every href is a route or section that already exists — the "never invent a
// route" rule (SPEC drift #16) applies here as well.
import {
  BriefcaseIcon,
  InformationCircleIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

export interface AlugueNaHoraLink {
  id: string
  title: string
  description: string
  href: string
  /** Minimal 24/outline heroicon, rendered at 16px next to the label. */
  icon: typeof InformationCircleIcon
}

export const ALUGUE_NA_HORA_LINKS: AlugueNaHoraLink[] = [
  {
    id: 'sobre',
    title: 'Sobre nós',
    description: 'A plataforma imobiliária especializada em locação',
    href: '/sobre',
    icon: InformationCircleIcon,
  },
  {
    id: 'como-funciona',
    title: 'Como funciona',
    description: 'Da busca ao contrato, em poucos passos',
    href: '/#como-funciona',
    icon: SparklesIcon,
  },
  {
    // Title/description mirror the `proprietario` entry of lib/userProfiles.ts (ANUNCIAR window
    // and ENTRAR modal) — the two profile labels must never drift apart.
    id: 'proprietario',
    title: 'Sou proprietário(a)',
    description: 'Anuncie seu próprio imóvel diretamente na plataforma',
    href: '/registro/proprietario',
    icon: KeyIcon,
  },
  {
    // Title/description mirror the `corretor` entry of lib/userProfiles.ts.
    id: 'corretor',
    title: 'Sou corretor(a) / imobiliária',
    description: 'Anuncie imóveis de seus clientes e gerencie sua carteira',
    href: '/registro/corretor',
    icon: BriefcaseIcon,
  },
]
