"use client";

import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { realisationsPage } from "@/lib/site";

const GridField = dynamic(() => import("@/components/webgl/GridField"), {
  ssr: false,
});

export default function RealisationsHero() {
  return (
    <PageHero
      index="05"
      tag="Réalisations"
      title={realisationsPage.title}
      paragraphs={realisationsPage.introParagraphs}
      markers={realisationsPage.markers}
      backdrop={<GridField />}
    />
  );
}
