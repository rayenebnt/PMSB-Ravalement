import type { Metadata } from "next";
import IsolationHero from "./IsolationHero";
import CardGrid from "@/components/sections/CardGrid";
import InsulationDemo from "@/components/sections/InsulationDemo";
import Marquee from "@/components/system/Marquee";
import { isolation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Isolation thermique par l'extérieur",
  description:
    "Laine de roche, polystyrène, graphité : PMSB identifie le matériau et la technique adaptés pour renforcer les performances énergétiques de votre bien.",
};

export default function IsolationPage() {
  return (
    <>
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
    </>
  );
}
