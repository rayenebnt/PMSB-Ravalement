import { company } from "@/lib/site";
import s from "./SideRail.module.css";

/**
 * Montants latéraux fixes : repères de chantier discrets qui encadrent
 * la page comme les garde-corps d'un échafaudage.
 */
export default function SideRail() {
  return (
    <div className={s.rails} aria-hidden="true">
      <div className={`${s.rail} ${s.left}`}>
        <span className={`mono ${s.text}`}>
          {company.name} — {company.address}
        </span>
      </div>

      <div className={`${s.rail} ${s.right}`}>
        <span className={s.track}>
          <span className={s.fill} />
        </span>
        <span className={`mono ${s.text}`}>Reconnu Garant de l&apos;Environnement</span>
      </div>
    </div>
  );
}
