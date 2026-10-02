import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, shareImage, socialImageUrl } from "@/lib/site";

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
  // Absolute-ises relative metadata URLs (canonical, og:image) — WhatsApp ignores relative ones.
  metadataBase: new URL(SITE_URL),
  title: "Alugue na Hora",
  description: SITE_DESCRIPTION,
  keywords: "aluguel, imóveis, campo grande, ms, casa, apartamento, alugar",
  // Site-wide fallback card: every page gets a thumbnail + description when shared on WhatsApp,
  // even the ones (home, notícias, sobre) that do not override these fields themselves. The
  // property page replaces them with the listing's own photo, title and details.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [shareImage(undefined, SITE_NAME)],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [socialImageUrl()],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// The maintenance shield is BACK ON (re-enabled 2026-10-02 at the owner's request; the same two lines
// `0bd967b` removed). It is a client-only component: it returns null once `useAuth().user` exists, so a
// signed-in visitor never sees it, and it lets `/login*` through so there is always a way in. Because it
// only renders after mount, the server HTML — and therefore every OG / link-preview crawler — is
// unaffected (see SPEC.md §3 drift #3 and AGENTS.md D12).
import MaintenanceOverlay from "@/components/MaintenanceOverlay";
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
          <MaintenanceOverlay />
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
