import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Geist Sans / Geist Mono are now self-hosted from ./fonts (same latin-subset variable fonts,
// wght 100-900, that next/font/google used to serve — rendering is unchanged). next/font/google
// downloads the CSS + woff2 from Google *at build time*, so any hiccup on that path aborted both
// `next build` and a cold `next dev` (NextFontError / Turbopack "Module not found ... font/google/font",
// SPEC.md §3 drift #15). Self-hosting removes that build-time third-party dependency.
// License: SIL OFL 1.1 — see ./fonts/LICENSE-OFL-1.1.txt.
const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Alugue na Hora",
  description: "Encontre o seu próximo lar! Imóveis para alugar com agilidade e os melhores preços em Campo Grande - MS.",
  keywords: "aluguel, imóveis, campo grande, ms, casa, apartamento, alugar",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// The maintenance shield (components/MaintenanceOverlay.tsx) was retired on 2026-09-30: the public launch is
// on, so anonymous visitors get the real site. The component file is parked, unused, for a future outage
// screen — do not re-mount it without updating SPEC.md §3 drift #3 and tools/dev.sh.
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="overflow-x-clip">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta httpEquiv="content-language" content="pt" />
        <meta name="google" content="translate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen overflow-x-clip`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-clip">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
