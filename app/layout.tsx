import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollEngine from "@/components/system/ScrollEngine";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";
import Preloader from "@/components/system/Preloader";
import ScrollProgress from "@/components/system/ScrollProgress";
import SideRail from "@/components/layout/SideRail";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pmsb-ravalement.fr"),
  title: {
    default: "PMSB — Ravalement de façade, isolation et étanchéité en Île-de-France",
    template: "%s · PMSB",
  },
  description:
    "PMSB, Prestations Multi Services Bâtiment : ravalement de façade, isolation thermique par l'extérieur, étanchéité et rénovation en région parisienne. Entreprise certifiée RGE.",
  keywords: [
    "ravalement de façade",
    "isolation thermique extérieure",
    "étanchéité balcon",
    "rénovation",
    "RGE",
    "Paris",
    "Île-de-France",
  ],
  icons: { icon: "/Logo.png" },
  themeColor: "#0d0d10",
  viewport: { width: "device-width", initialScale: 1 },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "PMSB",
    title: "PMSB — Ravalement, isolation et étanchéité",
    description:
      "Entreprise spécialisée dans la réalisation de divers travaux de bâtiment dans la région Parisienne. Certifiée RGE.",
    images: ["/new-hero.jpg"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Preloader />
        <ScrollEngine />
        <ScrollProgress />
        <Grain />
        <Cursor />
        <SideRail />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
