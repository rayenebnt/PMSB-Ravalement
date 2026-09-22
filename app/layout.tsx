import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SITE_URL, organizationSchema, websiteSchema } from "@/lib/seo";
import JsonLd from "@/components/system/JsonLd";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Ravalement de façade en Île-de-France — PMSB, entreprise certifiée RGE",
    template: "%s — PMSB",
  },
  description:
    "Entreprise de ravalement de façade, d'isolation thermique par l'extérieur et d'étanchéité en Île-de-France. Pierre de taille, brique, plâtre, imperméabilisation. Certifiée RGE, devis gratuit : 06 13 40 19 01.",
  applicationName: "PMSB",
  authors: [{ name: "PMSB — Prestations Multi Services Bâtiment" }],
  creator: "PMSB",
  publisher: "PMSB",
  category: "Bâtiment et travaux publics",
  keywords: [
    "ravalement de façade Île-de-France",
    "entreprise de ravalement Paris",
    "ravalement pierre de taille",
    "ravalement brique",
    "isolation thermique par l'extérieur",
    "ITE Île-de-France",
    "étanchéité balcon",
    "étanchéité terrasse",
    "étanchéité parking",
    "entreprise RGE",
    "façadier Val-de-Marne",
    "rénovation de façade région parisienne",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/Logo.png", apple: "/Logo.png" },
  themeColor: "#0d0d10",
  viewport: { width: "device-width", initialScale: 1 },
  formatDetection: { telephone: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "PMSB",
    url: SITE_URL,
    title: "Ravalement de façade en Île-de-France — PMSB, entreprise RGE",
    description:
      "Ravalement de façade, isolation thermique par l'extérieur et étanchéité sur toute l'Île-de-France. Entreprise certifiée RGE, basée à Bonneuil-sur-Marne.",
    images: [
      {
        url: "/new-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Façade ravalée par PMSB en Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravalement de façade en Île-de-France — PMSB",
    description:
      "Ravalement, isolation thermique par l'extérieur et étanchéité en région parisienne. Entreprise certifiée RGE.",
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
