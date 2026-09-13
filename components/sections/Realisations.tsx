"use client";

import dynamic from "next/dynamic";
import SectionHead from "../system/SectionHead";
import s from "./Realisations.module.css";

const Gallery3D = dynamic(() => import("../webgl/Gallery3D"), { ssr: false });

export default function Realisations() {
  return (
    <section className={`on-dark section ${s.section}`} id="realisations">
      <div className="shell">
        <SectionHead
          index="03"
          tag="Ce que nous avons accompli"
          title="Nos réalisations"
          lede="Façades parisiennes remises à neuf : piochage, ravalement à la chaux, zinguerie. Faites glisser pour parcourir."
        />
      </div>

      <div className={s.galleryWrap}>
        <Gallery3D />
      </div>
    </section>
  );
}
