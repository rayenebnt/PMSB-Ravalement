import type { Metadata } from "next";
import RealisationsHero from "./RealisationsHero";
import RealisationsGrid from "@/components/sections/RealisationsGrid";
import Marquee from "@/components/system/Marquee";
import RgeBlock from "@/components/sections/RgeBlock";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "Ravalement, pignon, bardage : découvrez les chantiers livrés par PMSB en région parisienne, avec les comparatifs avant / après.",
};

export default function RealisationsPage() {
  return (
    <>
      <RealisationsHero />
      <RealisationsGrid />
      <Marquee
        items={["Avant", "Après", "Chantier livré", "Région parisienne"]}
        outline
        speed={36}
      />
      <RgeBlock />
    </>
  );
}
