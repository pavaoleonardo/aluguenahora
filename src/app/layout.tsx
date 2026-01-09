import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AlugueNaHora - Imóveis em Campo Grande MS',
  description: 'Encontre casas, apartamentos e imóveis para alugar ou comprar em Campo Grande - MS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
