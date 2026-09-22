import Link from "next/link";
import SectionHead from "../system/SectionHead";
import { departements, featuredDepartements } from "@/lib/zones";
import s from "./ZonesTeaser.module.css";

/**
 * Rappel de la zone de chalandise sur la page d'accueil.
 * Sert autant au visiteur qu'au maillage interne vers les pages locales.
 */
export default function ZonesTeaser() {
  return (
    <section className={`section ${s.section}`} id="zones">
      <div className="shell">
        <SectionHead
          index="04"
          tag="Où nous intervenons"
          title="Toute l'Île-de-France"
          lede="Depuis notre siège de Bonneuil-sur-Marne, nous couvrons les huit départements franciliens. Paris, le Val-de-Marne, la Seine-Saint-Denis et les Hauts-de-Seine concentrent l'essentiel de nos chantiers."
        />

        <div className={s.grid}>
          <ul className={s.featured}>
            {featuredDepartements.map((dep, i) => (
              <li key={dep.slug} data-reveal="up" data-reveal-delay={i * 90}>
                <Link href={`/zones/${dep.slug}`} className={s.card}>
                  <span className={`mono ${s.code}`}>{dep.code}</span>
                  <span className={`display ${s.name}`}>{dep.name}</span>
                  <span className={`mono ${s.more}`}>
                    Ravalement {dep.inPhrase}{" "}
                    <span className="btn-arrow">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.aside} data-reveal="up" data-reveal-delay="200">
            <p className={`body-text ${s.asideText}`}>
              Nous nous déplaçons également en Seine-et-Marne, dans les
              Yvelines, l&apos;Essonne et le Val-d&apos;Oise.
            </p>
            <p className={`mono ${s.list}`}>
              {departements.map((d) => `${d.name} (${d.code})`).join(" · ")}
            </p>
            <Link href="/zones-d-intervention" className="btn btn-ghost">
              Voir les zones d&apos;intervention
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
