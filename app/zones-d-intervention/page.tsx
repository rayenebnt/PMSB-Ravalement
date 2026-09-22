import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/layout/PageHero";
import SectionHead from "@/components/system/SectionHead";
import JsonLd from "@/components/system/JsonLd";
import Magnetic from "@/components/system/Magnetic";
import GridBackdrop from "@/components/webgl/GridBackdrop";
import { company } from "@/lib/site";
import { departements, zones } from "@/lib/zones";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import s from "@/components/sections/Zone.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Zones d'intervention en Île-de-France",
  description:
    "PMSB intervient sur les huit départements d'Île-de-France : Paris, Val-de-Marne, Seine-Saint-Denis, Hauts-de-Seine, Seine-et-Marne, Yvelines, Essonne et Val-d'Oise. Ravalement de façade, isolation par l'extérieur et étanchéité.",
  path: "/zones-d-intervention",
  keywords: [
    "ravalement de façade Île-de-France",
    "entreprise de ravalement région parisienne",
    "façadier Paris",
    "ITE Île-de-France",
    "étanchéité région parisienne",
  ],
});

export default function ZonesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Zones d'intervention", path: "/zones-d-intervention" },
        ])}
      />

      <PageHero
        index="05"
        tag="Zones d'intervention"
        title="Ravalement et isolation sur toute l'Île-de-France"
        compact
        backdrop={<GridBackdrop />}
        paragraphs={[zones.lede, ...zones.paragraphs]}
        markers={[
          "8 départements couverts",
          "Siège à Bonneuil-sur-Marne (94)",
          "Entreprise certifiée RGE",
        ]}
      />

      {/* ── Les huit départements ── */}
      <section className={`section ${s.section}`} id="departements">
        <div className="shell">
          <SectionHead
            index="01"
            tag="Couverture"
            title="Les huit départements franciliens"
            lede="Quatre départements disposent d'une page détaillée, décrivant le bâti local et les points d'attention propres au territoire."
          />

          <div className={s.deps}>
            {departements.map((dep, i) => {
              const card = (
                <article className={s.dep}>
                  <span className={`mono ${s.depCode}`}>{dep.code}</span>
                  <h2 className={`display ${s.depName}`}>{dep.name}</h2>
                  <p className={s.depLede}>{dep.lede}</p>
                  <p className={s.depCommunes}>
                    {dep.communes.slice(0, 5).join(" · ")}
                    {dep.communes.length > 5 ? "…" : ""}
                  </p>
                  {dep.featured && (
                    <span className={`mono ${s.depMore}`}>
                      Voir la page <span className="btn-arrow">→</span>
                    </span>
                  )}
                </article>
              );

              return dep.featured ? (
                <Link
                  key={dep.slug}
                  href={`/zones/${dep.slug}`}
                  className={s.depLink}
                  data-reveal="up"
                  data-reveal-delay={(i % 4) * 90}
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={dep.slug}
                  data-reveal="up"
                  data-reveal-delay={(i % 4) * 90}
                >
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Rappel des métiers ── */}
      <section className={`on-dark section ${s.section}`} id="prestations">
        <div className="shell">
          <SectionHead
            index="02"
            tag="Prestations"
            title="Ce que nous réalisons partout en Île-de-France"
            lede="Trois métiers qui se combinent souvent sur un même chantier."
          />

          <div className={s.prestations}>
            {[
              {
                href: "/ravalement",
                title: "Ravalement de façade",
                text: "Pierre de taille, brique, plâtre, imperméabilisation : nettoyer, décaper, reprendre et protéger.",
              },
              {
                href: "/isolation",
                title: "Isolation par l'extérieur",
                text: "Laine de roche, polystyrène, graphité : supprimer les ponts thermiques et refaire la façade d'un même geste.",
              },
              {
                href: "/etancheite",
                title: "Étanchéité",
                text: "Balcons, terrasses, caves et parkings : arrêter les infiltrations avant qu'elles n'atteignent la structure.",
              },
            ].map((prestation, i) => (
              <Link
                key={prestation.href}
                href={prestation.href}
                className={s.prestation}
                data-reveal="up"
                data-reveal-delay={i * 110}
              >
                <h3 className={`display ${s.prestationTitle}`}>
                  {prestation.title}
                </h3>
                <p className="body-text">{prestation.text}</p>
                <span className={`mono ${s.prestationLink}`}>
                  En savoir plus <span className="btn-arrow">→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className={s.callout}>
            <p className={`lede ${s.calloutText}`}>
              Un projet de façade en Île-de-France ? Décrivez-nous le bâtiment,
              nous organisons une visite de diagnostic.
            </p>
            <Magnetic strength={0.22} radius={60}>
              <a href={company.phoneHref} className="btn btn-solid">
                {company.phone}
                <span className="btn-arrow">→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
