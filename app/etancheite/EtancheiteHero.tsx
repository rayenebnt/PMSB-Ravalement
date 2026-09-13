"use client";

import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { etancheite } from "@/lib/site";

const WaterSurface = dynamic(() => import("@/components/webgl/WaterSurface"), {
  ssr: false,
});

export default function EtancheiteHero() {
  return (
    <PageHero
      index="04"
      tag="Étanchéité"
      title={etancheite.title}
      paragraphs={etancheite.introParagraphs}
      markers={[
        "Balcons et terrasses",
        "Caves et parkings",
        "Passez le curseur : l'eau perle",
      ]}
      backdrop={<WaterSurface />}
    />
  );
}
