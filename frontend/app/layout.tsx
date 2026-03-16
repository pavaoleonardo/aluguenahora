import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alugue na Hora",
  description: "Encontre o seu próximo lar! Imóveis para alugar com agilidade e os melhores preços em Campo Grande - MS.",
  keywords: "aluguel, imóveis, campo grande, ms, casa, apartamento, alugar",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaintenanceOverlay from "@/components/MaintenanceOverlay";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="overflow-x-clip">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta httpEquiv="content-language" content="pt-br" />
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
