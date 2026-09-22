"use client";

import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { ravalement } from "@/lib/site";
import s from "./hero.module.css";

const GridField = dynamic(() => import("@/components/webgl/GridField"), {
  ssr: false,
});
const MaterialCanvas = dynamic(
  () => import("@/components/webgl/MaterialCanvas"),
  { ssr: false }
);

export default function RavalementHero() {
  return (
    <PageHero
      index="02"
      tag="Ravalement"
      title="Ravalement de façade"
      paragraphs={[ravalement.intro]}
      markers={["Pierre de taille", "Brique", "Plâtre", "Imperméabilisation"]}
      backdrop={
        <>
          <GridField />
          <div className={s.object}>
            <MaterialCanvas variant={0} />
          </div>
        </>
      }
    />
  );
}
