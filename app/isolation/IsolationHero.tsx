"use client";

import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { isolation } from "@/lib/site";

const ThermalFacade = dynamic(
  () => import("@/components/webgl/ThermalFacade"),
  { ssr: false }
);

export default function IsolationHero() {
  return (
    <PageHero
      index="03"
      tag="Isolation"
      title="Isolation thermique par l'extérieur"
      paragraphs={isolation.introParagraphs}
      markers={[
        "Thermographie en direct",
        "Passez le curseur pour isoler",
        "Jusqu'à 30 % d'économies",
      ]}
      backdrop={<ThermalFacade />}
    />
  );
}
