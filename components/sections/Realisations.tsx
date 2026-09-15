"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import SectionHead from "../system/SectionHead";
import Magnetic from "../system/Magnetic";
import { realisations } from "@/lib/site";
import s from "./Realisations.module.css";

const Gallery3D = dynamic(() => import("../webgl/Gallery3D"), { ssr: false });

export default function Realisations() {
  const total = realisations.length;
  const comparable = realisations.filter((r) => r.before).length;

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

      <div className={`shell ${s.footer}`}>
        <span className={`mono ${s.count}`}>
          {total} chantiers en ligne
          {comparable > 0 && ` — dont ${comparable} en avant / après`}
        </span>

        <Magnetic strength={0.18} radius={60}>
          <Link href="/realisations" className={`btn btn-solid ${s.cta}`}>
            Voir toutes les réalisations
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
