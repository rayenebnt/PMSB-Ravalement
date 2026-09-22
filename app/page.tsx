import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Method from "@/components/sections/Method";
import About from "@/components/sections/About";
import Realisations from "@/components/sections/Realisations";
import ZonesTeaser from "@/components/sections/ZonesTeaser";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/system/JsonLd";
import { faqGenerale } from "@/lib/site";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title:
    "Ravalement de façade en Île-de-France — PMSB, entreprise certifiée RGE",
  description:
    "Entreprise de ravalement de façade, d'isolation thermique par l'extérieur et d'étanchéité en Île-de-France. Pierre de taille, brique, plâtre, imperméabilisation. Certifiée RGE, devis gratuit : 06 13 40 19 01.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqGenerale)} />

      <Hero />
      <Stats />
      <Services />
      <Method />
      <About />
      <Realisations />
      <ZonesTeaser />
      <Faq
        index="05"
        title="Questions fréquentes"
        lede="Les questions que l'on nous pose le plus souvent avant d'engager des travaux de façade."
        items={faqGenerale}
      />
    </>
  );
}
