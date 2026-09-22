import type { Metadata } from "next";

import EtancheiteHero from "./EtancheiteHero";
import CardGrid from "@/components/sections/CardGrid";
import Marquee from "@/components/system/Marquee";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/system/JsonLd";
import { company, etancheite, faqEtancheite } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Étanchéité de balcon, terrasse et parking en Île-de-France",
  description: `Réfection d'étanchéité en Île-de-France : balcons, terrasses, caves et parkings. Primaire d'accrochage, peinture résine et laque de finition contre les infiltrations. Devis gratuit : ${company.phone}.`,
  path: "/etancheite",
  image: "/new-etancheite.jpg",
  keywords: [
    "étanchéité balcon",
    "étanchéité terrasse",
    "étanchéité parking",
    "étanchéité cave",
    "infiltration balcon",
    "réfection étanchéité Île-de-France",
  ],
});

export default function EtancheitePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Étanchéité de balcons, terrasses, caves et parkings",
            description:
              "Réfection des complexes d'étanchéité : préparation du support, primaire d'accrochage, peinture résine et laque de finition, pour empêcher toute infiltration d'eau.",
            path: "/etancheite",
            serviceType: "Étanchéité",
          }),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Étanchéité", path: "/etancheite" },
          ]),
          faqSchema(faqEtancheite),
        ]}
      />

      <EtancheiteHero />
      <CardGrid
        id="types"
        index="01"
        tag="Ouvrages"
        title={etancheite.typesTitle}
        lede="Chaque support appelle un complexe d'étanchéité adapté : nous intervenons sur les ouvrages les plus exposés aux infiltrations."
        items={etancheite.types}
        columns={3}
      />
      <Marquee
        items={["Balcon", "Cave", "Parking", "Terrasse"]}
        outline
        reverse
        speed={36}
      />
      <CardGrid
        id="produits"
        index="02"
        tag="Produits"
        title={etancheite.productsTitle}
        lede="Trois couches complémentaires : accrochage du support, protection de la surface et finition durable."
        items={etancheite.products}
        columns={3}
        dark
      />
      <Faq
        index="03"
        title="Questions fréquentes sur l'étanchéité"
        items={faqEtancheite}
      />
    </>
  );
}
