import dynamic from "next/dynamic";
import Link from "next/link";
import SectionHead from "../system/SectionHead";
import Magnetic from "../system/Magnetic";
import { realisations } from "@/lib/site";
import s from "./Realisations.module.css";

const RealisationsWall = dynamic(
  () => import("../webgl/RealisationsWall"),
  { ssr: false }
);

export default function Realisations() {
  const total = realisations.length;
  const comparable = realisations.filter((r) => r.before).length;

  return (
    <section className={`section ${s.section}`} id="realisations">
      <div className="shell">
        <SectionHead
          index="03"
          tag="Ce que nous avons accompli"
          title="Nos réalisations"
          lede="Façades parisiennes remises à neuf : piochage, ravalement à la chaux, bardage, zinguerie. Faites glisser le mur, cliquez sur un chantier pour le voir en grand."
        />
      </div>

      <div className={s.gallery}>
        <RealisationsWall />
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
