import type { Metadata } from "next";

import IsolationHero from "./IsolationHero";
import CardGrid from "@/components/sections/CardGrid";
import InsulationDemo from "@/components/sections/InsulationDemo";
import Marquee from "@/components/system/Marquee";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/system/JsonLd";
import { company, faqIsolation, isolation } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Isolation thermique par l'extérieur (ITE) en Île-de-France",
  description: `Isolation thermique par l'extérieur en Île-de-France : laine de roche, polystyrène, graphité et enduit de finition. Entreprise RGE, accès aux aides à la rénovation énergétique. Devis gratuit : ${company.phone}.`,
  path: "/isolation",
  image: "/new-isolation.jpg",
  keywords: [
    "isolation thermique par l'extérieur",
    "ITE Île-de-France",
    "isolation façade Paris",
    "laine de roche",
    "polystyrène isolation",
    "graphité isolation",
    "rénovation énergétique RGE",
  ],
});

export default function IsolationPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Isolation thermique par l'extérieur",
            description:
              "Pose d'isolant par l'extérieur — laine de roche, polystyrène ou graphité — puis enduit de finition, pour supprimer les ponts thermiques et refaire la façade en une seule opération.",
            path: "/isolation",
            serviceType: "Isolation thermique par l'extérieur",
          }),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Isolation thermique", path: "/isolation" },
          ]),
          faqSchema(faqIsolation),
        ]}
      />

      <IsolationHero />
      <CardGrid
        id="materiaux"
        index="01"
        tag="Matériaux"
        title={isolation.sectionTitle}
        lede={isolation.sectionText}
        items={isolation.materials}
        columns={4}
      />
      <Marquee
        items={["Laine de roche", "Polystyrène", "Graphité", "Confort thermique"]}
        outline
        speed={40}
      />
      <InsulationDemo />
      <Faq
        index="03"
        title="Questions fréquentes sur l'isolation"
        items={faqIsolation}
      />
    </>
  );
}
