import type { Metadata } from "next";
import { company, horaires } from "./site";

/**
 * Socle de référencement.
 *
 * Un seul endroit décrit le domaine, les URL absolues et les données
 * structurées. Changer `SITE_URL` suffit à mettre à jour les canoniques,
 * le sitemap, les aperçus de partage et le balisage schema.org.
 */

export const SITE_URL = "https://pmsbbatiment.fr";

export const SITE_NAME = "PMSB";

/** Identifiant stable de l'entreprise dans le graphe schema.org. */
export const ORG_ID = `${SITE_URL}/#entreprise`;

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/* ══════════════════════════════════════════════════════════════
   Métadonnées
   ══════════════════════════════════════════════════════════════ */

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Visuel de partage, relatif à la racine du site. */
  image?: string;
  keywords?: string[];
}

/**
 * Construit le bloc de métadonnées d'une page : canonique, Open Graph
 * et carte Twitter alignés sur le même titre et la même description.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/new-hero.jpg",
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ══════════════════════════════════════════════════════════════
   Données structurées
   ══════════════════════════════════════════════════════════════ */

/** Les huit départements franciliens, pour `areaServed`. */
export const IDF_DEPARTMENTS = [
  "Paris (75)",
  "Seine-et-Marne (77)",
  "Yvelines (78)",
  "Essonne (91)",
  "Hauts-de-Seine (92)",
  "Seine-Saint-Denis (93)",
  "Val-de-Marne (94)",
  "Val-d'Oise (95)",
];

const SERVICE_CATALOG = [
  {
    name: "Ravalement de façade",
    description:
      "Nettoyage, décapage, piochage, reprise de pierre de taille, de brique et de plâtre, imperméabilisation et mise en peinture.",
    path: "/ravalement",
  },
  {
    name: "Isolation thermique par l'extérieur",
    description:
      "Pose de laine de roche, de polystyrène ou de graphité, puis enduit de finition, pour supprimer les ponts thermiques.",
    path: "/isolation",
  },
  {
    name: "Étanchéité",
    description:
      "Réfection des complexes d'étanchéité de balcons, terrasses, caves et parkings : primaire d'accrochage, résine et laque de finition.",
    path: "/etancheite",
  },
  {
    name: "Travaux de rénovation",
    description:
      "Rénovation intérieure, peinture et décoration, en complément des travaux de façade.",
    path: "/",
  },
];

/**
 * Fiche d'entreprise locale. C'est elle qui relie la prestation au
 * territoire : sans `areaServed`, rien ne rattache PMSB à l'Île-de-France.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: `${company.name} — ${company.legalName}`,
    description:
      "Entreprise de ravalement de façade, d'isolation thermique par l'extérieur et d'étanchéité en Île-de-France. Certifiée RGE.",
    url: SITE_URL,
    logo: absoluteUrl("/Logo.png"),
    image: absoluteUrl("/new-hero.jpg"),
    telephone: "+33613401901",
    email: company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bonneuil-sur-Marne",
      postalCode: "94380",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    // Centre de Bonneuil-sur-Marne : l'entreprise intervient sur chantier,
    // le point ne situe donc que la commune de rattachement.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.7706,
      longitude: 2.4886,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      ...IDF_DEPARTMENTS.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
    ],
    openingHoursSpecification: horaires.map((plage) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: plage.days,
      opens: plage.opens,
      closes: plage.closes,
    })),
    sameAs: [company.linkedin, company.googleBusiness],
    knowsAbout: [
      "Ravalement de façade",
      "Pierre de taille",
      "Brique",
      "Plâtre",
      "Imperméabilisation de façade",
      "Isolation thermique par l'extérieur",
      "Étanchéité de balcon",
      "Étanchéité de terrasse",
      "Rénovation énergétique",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "RGE — Reconnu Garant de l'Environnement",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations PMSB",
      itemListElement: SERVICE_CATALOG.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: absoluteUrl(service.path),
        },
      })),
    },
  };
}

/** Prestation rattachée à l'entreprise et à sa zone de chalandise. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      ...IDF_DEPARTMENTS.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(input.path),
      servicePhone: "+33613401901",
    },
  };
}

/** Fil d'ariane : aide Google à afficher le chemin sous le résultat. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

/** Questions fréquentes : capte les recherches formulées en langage naturel. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
  };
}
