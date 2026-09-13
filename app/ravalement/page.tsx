import type { Metadata } from "next";
import RavalementHero from "./RavalementHero";
import Expertises from "@/components/sections/Expertises";
import RgeBlock from "@/components/sections/RgeBlock";
import Marquee from "@/components/system/Marquee";

export const metadata: Metadata = {
  title: "Ravalement de façade",
  description:
    "Nettoyer, décaper, repeindre : PMSB réalise vos travaux de ravalement de façade en pierre de taille, brique, plâtre et imperméabilisation.",
};

export default function RavalementPage() {
  return (
    <>
      <RavalementHero />
      <Expertises />
      <Marquee
        items={["Pierre de taille", "Brique", "Plâtre", "Imperméabilisation"]}
        outline
        reverse
        speed={38}
      />
      <RgeBlock />
    </>
  );
}
