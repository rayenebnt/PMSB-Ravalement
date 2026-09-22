import type { Metadata } from "next";

import RavalementHero from "./RavalementHero";
import Expertises from "@/components/sections/Expertises";
import RgeBlock from "@/components/sections/RgeBlock";
import Marquee from "@/components/system/Marquee";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/system/JsonLd";
import { company, faqRavalement } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ravalement de façade en Île-de-France — pierre, brique, plâtre",
  description: `Entreprise de ravalement de façade en Île-de-France : nettoyage, décapage, pierre de taille, brique, plâtre et imperméabilisation I1 à I4. Certifiée RGE, devis gratuit : ${company.phone}.`,
  path: "/ravalement",
  image: "/new-ravalement.jpg",
  keywords: [
    "ravalement de façade",
    "entreprise de ravalement Île-de-France",
    "ravalement pierre de taille",
    "ravalement brique",
    "ravalement plâtre",
    "imperméabilisation de façade",
    "façadier Paris",
  ],
});

export default function RavalementPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Ravalement de façade",
            description:
              "Nettoyage, décapage, piochage, reprise de pierre de taille, de brique et de plâtre, imperméabilisation de façade des classes I1 à I4 et mise en peinture, sur toute l'Île-de-France.",
            path: "/ravalement",
          }),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Ravalement de façade", path: "/ravalement" },
          ]),
          faqSchema(faqRavalement),
        ]}
      />

      <RavalementHero />
      <Expertises />
      <Marquee
        items={["Pierre de taille", "Brique", "Plâtre", "Imperméabilisation"]}
        outline
        reverse
        speed={38}
      />
      <RgeBlock />
      <Faq
        index="03"
        title="Questions fréquentes sur le ravalement"
        items={faqRavalement}
      />
    </>
  );
}
