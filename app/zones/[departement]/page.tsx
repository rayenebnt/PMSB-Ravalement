import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import SectionHead from "@/components/system/SectionHead";
import Faq from "@/components/sections/Faq";
import JsonLd from "@/components/system/JsonLd";
import Magnetic from "@/components/system/Magnetic";
import GridBackdrop from "@/components/webgl/GridBackdrop";
import { company } from "@/lib/site";
import { featuredDepartements, getDepartement } from "@/lib/zones";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  ORG_ID,
  pageMetadata,
} from "@/lib/seo";
import s from "@/components/sections/Zone.module.css";

/* Seules les quatre pages départementales rédigées existent. */
export const dynamicParams = false;

export function generateStaticParams() {
  return featuredDepartements.map((d) => ({ departement: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { departement: string };
}): Metadata {
  const dep = getDepartement(params.departement);
  if (!dep) return {};

  return pageMetadata({
    title: `Ravalement de façade ${dep.inPhrase} (${dep.code})`,
    description: `PMSB réalise vos travaux de ravalement de façade, d'isolation thermique par l'extérieur et d'étanchéité ${dep.inPhrase} (${dep.code}). Entreprise certifiée RGE basée à Bonneuil-sur-Marne. Devis gratuit : ${company.phone}.`,
    path: `/zones/${dep.slug}`,
    keywords: [
      `ravalement de façade ${dep.name}`,
      `entreprise de ravalement ${dep.name}`,
      `isolation thermique extérieure ${dep.name}`,
      `étanchéité ${dep.name}`,
      `façadier ${dep.code}`,
    ],
  });
}

const prestations = [
  {
    title: "Ravalement de façade",
    href: "/ravalement",
    text: "Nettoyage, décapage, piochage, reprise de pierre de taille, de brique ou de plâtre, imperméabilisation et finition.",
  },
  {
    title: "Isolation par l'extérieur",
    href: "/isolation",
    text: "Laine de roche, polystyrène ou graphité, puis enduit de finition : les ponts thermiques disparaissent et la façade est refaite.",
  },
  {
    title: "Étanchéité",
    href: "/etancheite",
    text: "Balcons, terrasses, caves et parkings : primaire d'accrochage, peinture résine et laque de finition contre les infiltrations.",
  },
];

export default function DepartementPage({
  params,
}: {
  params: { departement: string };
}) {
  const dep = getDepartement(params.departement);
  if (!dep) notFound();

  const path = `/zones/${dep.slug}`;
  const title = `Ravalement de façade ${dep.inPhrase} (${dep.code})`;

  const schemas: object[] = [
    breadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Zones d'intervention", path: "/zones-d-intervention" },
      { name: `${dep.name} (${dep.code})`, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Ravalement de façade ${dep.inPhrase}`,
      description: dep.lede,
      serviceType: "Ravalement de façade",
      url: absoluteUrl(path),
      provider: { "@id": ORG_ID },
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${dep.name} (${dep.code})`,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Île-de-France",
        },
      },
    },
  ];

  if (dep.faq.length > 0) schemas.push(faqSchema(dep.faq));

  return (
    <>
      <JsonLd data={schemas} />

      <PageHero
        index={dep.code}
        tag={`${dep.name} (${dep.code})`}
        title={title}
        compact
        backdrop={<GridBackdrop />}
        parent={{ label: "Zones d'intervention", href: "/zones-d-intervention" }}
        paragraphs={[
          dep.lede,
          `PMSB intervient ${dep.inPhrase} depuis son siège de Bonneuil-sur-Marne, dans le Val-de-Marne. Ravalement, isolation thermique par l'extérieur et étanchéité : nos équipes travaillent aussi bien pour les copropriétés que pour les propriétaires particuliers.`,
        ]}
        markers={[
          "Entreprise certifiée RGE",
          "Devis gratuit après visite",
          `${dep.communes.length} communes desservies`,
        ]}
      />

      {/* ── Le bâti local ── */}
      <section className={`section ${s.section}`} id="bati">
        <div className="shell">
          <SectionHead
            index="01"
            tag="Le terrain"
            title={`Le bâti que nous rencontrons ${dep.inPhrase}`}
            lede={`Une façade ne se traite pas de la même manière selon qu'elle est en pierre, en brique, en meulière ou en béton. Voici ce que nos équipes rencontrent ${dep.inPhrase}.`}
          />

          <ul className={s.bullets}>
            {dep.bati.map((line, i) => (
              <li key={i} data-reveal="up" data-reveal-delay={i * 70}>
                <span className={s.tick} aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Enjeux locaux ── */}
      <section className={`on-dark section ${s.section}`} id="enjeux">
        <div className="shell">
          <SectionHead
            index="02"
            tag="Points d'attention"
            title={`Ce qu'il faut savoir avant de lancer les travaux`}
          />

          <ul className={s.enjeux}>
            {dep.enjeux.map((enjeu, i) => (
              <li
                key={enjeu.title}
                className={s.enjeu}
                data-reveal="up"
                data-reveal-delay={i * 110}
              >
                <span className={`mono ${s.enjeuNum}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`display ${s.enjeuTitle}`}>{enjeu.title}</h3>
                <p className="body-text">{enjeu.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Prestations, avec maillage vers les pages métier ── */}
      <section className={`section ${s.section}`} id="prestations">
        <div className="shell">
          <SectionHead
            index="03"
            tag="Prestations"
            title={`Nos interventions ${dep.inPhrase}`}
            lede="Trois métiers qui se combinent souvent sur un même chantier : un seul échafaudage, un seul planning."
          />

          <div className={s.prestations}>
            {prestations.map((prestation, i) => (
              <Link
                key={prestation.href}
                href={prestation.href}
                className={s.prestation}
                data-reveal="up"
                data-reveal-delay={i * 110}
              >
                <h3 className={`display ${s.prestationTitle}`}>
                  {prestation.title} {dep.inPhrase}
                </h3>
                <p className="body-text">{prestation.text}</p>
                <span className={`mono ${s.prestationLink}`}>
                  En savoir plus <span className="btn-arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Communes ── */}
      <section className={`section ${s.section}`} id="communes">
        <div className="shell">
          <SectionHead
            index="04"
            tag="Couverture"
            title={`Communes desservies ${dep.inPhrase}`}
            lede={`Nos équipes se déplacent sur l'ensemble du département. Les communes ci-dessous sont celles où nous intervenons le plus souvent.`}
          />

          <ul className={s.communes}>
            {dep.communes.map((commune) => (
              <li key={commune} className={`${s.commune}`}>
                {commune}
              </li>
            ))}
          </ul>

          <p className={`mono ${s.communesNote}`}>
            Votre commune n&apos;apparaît pas ? Nous intervenons sur tout le
            département — appelez-nous pour en parler.
          </p>

          <div className={s.callout}>
            <p className={`lede ${s.calloutText}`}>
              Un diagnostic de façade {dep.inPhrase} ? Nous passons sur place,
              relevons l&apos;état des supports et vous remettons un devis
              détaillé, poste par poste.
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

      <Faq
        index="05"
        title={`Questions fréquentes ${dep.inPhrase}`}
        items={dep.faq}
        dark
      />
    </>
  );
}
