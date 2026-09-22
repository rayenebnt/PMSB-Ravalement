/**
 * Zones d'intervention.
 *
 * Les quatre départements les plus proches du siège disposent d'une page
 * dédiée ; les quatre autres sont couverts par la page « Zones
 * d'intervention ». Chaque page départementale décrit le bâti réellement
 * rencontré sur place : c'est ce qui la distingue d'une page satellite.
 */

export interface Departement {
  slug: string;
  /** Numéro du département. */
  code: string;
  /** Nom administratif, tel qu'il se cherche. */
  name: string;
  /** Formulation naturelle dans une phrase : « à Paris », « dans le 92 ». */
  inPhrase: string;
  /** Page dédiée, ou simple mention sur la page zones. */
  featured: boolean;
  /** Accroche courte, reprise en méta-description. */
  lede: string;
  /** Ce que l'on trouve comme bâti, et ce que cela implique en travaux. */
  bati: string[];
  /** Points d'attention propres au territoire. */
  enjeux: { title: string; text: string }[];
  /** Communes desservies, les plus peuplées en premier. */
  communes: string[];
  faq: { question: string; answer: string }[];
}

export const departements: Departement[] = [
  {
    slug: "paris-75",
    code: "75",
    name: "Paris",
    inPhrase: "à Paris",
    featured: true,
    lede: "Immeubles haussmanniens, pierre de taille et plâtre : le ravalement parisien demande des techniques que tous les façadiers ne pratiquent pas.",
    bati: [
      "Immeubles de rapport du XIXe siècle en pierre de taille calcaire, avec modénatures, corniches et bandeaux à restituer à l'identique.",
      "Façades enduites au plâtre et à la chaux sur les immeubles plus modestes, particulièrement sensibles aux intempéries et à l'exposition.",
      "Cours intérieures étroites, souvent humides, où la reprise d'enduit s'accompagne d'un traitement des remontées d'humidité.",
      "Zinguerie de couronnement, chéneaux et descentes à reprendre en même temps que la façade.",
    ],
    enjeux: [
      {
        title: "Ravalement périodique",
        text: "À Paris, le ravalement peut être imposé par injonction de la commune, en principe tous les dix ans, au titre de l'article L.132-1 du Code de la construction et de l'habitation. Mieux vaut anticiper la mise en demeure que la subir.",
      },
      {
        title: "Autorisations et accès",
        text: "Déclaration préalable, autorisation d'échafaudage sur voirie, contraintes de stationnement et horaires de chantier : en cœur de ville, la préparation administrative pèse autant que les travaux.",
      },
      {
        title: "Respect de l'existant",
        text: "Retaille de pierre, incrustation, reconstitution de décors : sur un immeuble ancien, la façade se répare, elle ne se recouvre pas.",
      },
    ],
    communes: [
      "Paris 1er",
      "Paris 2e",
      "Paris 3e",
      "Paris 4e",
      "Paris 5e",
      "Paris 6e",
      "Paris 7e",
      "Paris 8e",
      "Paris 9e",
      "Paris 10e",
      "Paris 11e",
      "Paris 12e",
      "Paris 13e",
      "Paris 14e",
      "Paris 15e",
      "Paris 16e",
      "Paris 17e",
      "Paris 18e",
      "Paris 19e",
      "Paris 20e",
    ],
    faq: [
      {
        question: "Le ravalement de façade est-il obligatoire à Paris ?",
        answer:
          "La commune peut enjoindre un propriétaire de faire ravaler sa façade, en principe tous les dix ans, au titre de l'article L.132-1 du Code de la construction et de l'habitation. Le propriétaire dispose alors d'un délai pour engager les travaux. Faire établir un diagnostic avant de recevoir une injonction permet d'étaler la dépense et de choisir son entreprise sans urgence.",
      },
      {
        question: "Intervenez-vous sur les immeubles en pierre de taille ?",
        answer:
          "Oui. La pierre de taille est l'une de nos spécialités : reconstitution de pierre désagrégée, retaille, incrustation, reprise de décors et de modénatures. C'est un travail de restauration, distinct d'un simple nettoyage de façade.",
      },
      {
        question: "Qui s'occupe des démarches et de l'échafaudage ?",
        answer:
          "Nous vous accompagnons sur le montage du dossier et prenons en charge l'installation du chantier, échafaudage compris, en tenant compte des contraintes de voirie et de voisinage propres à Paris.",
      },
    ],
  },
  {
    slug: "hauts-de-seine-92",
    code: "92",
    name: "Hauts-de-Seine",
    inPhrase: "dans les Hauts-de-Seine",
    featured: true,
    lede: "Immeubles de rapport, copropriétés des années 60 et pavillons en meulière : un parc hétérogène qui appelle des réponses différentes.",
    bati: [
      "Immeubles de rapport de la fin du XIXe siècle, en pierre et en enduit, dans les communes limitrophes de Paris.",
      "Copropriétés des années 1960 et 1970 en béton, souvent mal isolées : l'isolation par l'extérieur y règle le confort et l'aspect d'un seul geste.",
      "Pavillons en meulière de l'ouest du département, aux parements à conserver et aux joints à reprendre.",
      "Résidences récentes en enduit monocouche, où le ravalement relève surtout de l'entretien et de l'imperméabilisation.",
    ],
    enjeux: [
      {
        title: "Copropriétés et vote en assemblée",
        text: "Un ravalement de copropriété se décide en assemblée générale, sur devis comparés. Nous fournissons un chiffrage détaillé poste par poste, exploitable tel quel par le syndic.",
      },
      {
        title: "Isolation et économies d'énergie",
        text: "Sur les bâtiments des années 60 et 70, coupler ravalement et isolation par l'extérieur évite de payer deux fois l'échafaudage, et ouvre l'accès aux aides à la rénovation énergétique.",
      },
      {
        title: "Meulière et pierre apparente",
        text: "La meulière ne se recouvre pas : elle se nettoie et se rejointoie. Nous traitons ces parements sans les dénaturer.",
      },
    ],
    communes: [
      "Boulogne-Billancourt",
      "Nanterre",
      "Asnières-sur-Seine",
      "Colombes",
      "Courbevoie",
      "Rueil-Malmaison",
      "Issy-les-Moulineaux",
      "Levallois-Perret",
      "Neuilly-sur-Seine",
      "Antony",
      "Clichy",
      "Clamart",
      "Montrouge",
      "Puteaux",
      "Suresnes",
      "Meudon",
      "Gennevilliers",
      "Malakoff",
    ],
    faq: [
      {
        question: "Travaillez-vous avec les syndics de copropriété ?",
        answer:
          "Oui. Nous établissons des devis détaillés poste par poste, adaptés à une présentation en assemblée générale, et nous tenons le syndic informé de l'avancement pendant toute la durée du chantier.",
      },
      {
        question: "Peut-on isoler et ravaler en une seule opération ?",
        answer:
          "C'est même la meilleure façon de procéder. L'isolation par l'extérieur se termine par un enduit de finition qui fait office de ravalement : un seul échafaudage, un seul chantier, et un bâtiment nettement plus performant.",
      },
    ],
  },
  {
    slug: "seine-saint-denis-93",
    code: "93",
    name: "Seine-Saint-Denis",
    inPhrase: "en Seine-Saint-Denis",
    featured: true,
    lede: "Brique rouge, meulière et grands ensembles en béton : un département où l'isolation par l'extérieur change vraiment la donne.",
    bati: [
      "Brique rouge des cités-jardins et des logements ouvriers, dont le parement se nettoie et se rejointoie plutôt qu'il ne se recouvre.",
      "Pavillons en meulière du début du XXe siècle, aux encadrements en brique et aux joints à reprendre.",
      "Grands ensembles des années 1960 et 1970 en béton, très demandeurs d'isolation thermique par l'extérieur.",
      "Bâtiments d'activité et parkings enterrés, où l'étanchéité conditionne la tenue de la structure.",
    ],
    enjeux: [
      {
        title: "Performance énergétique",
        text: "Sur le parc collectif des années 60 et 70, l'isolation par l'extérieur supprime les ponts thermiques et fait chuter les charges de chauffage. Notre qualification RGE ouvre l'accès aux aides.",
      },
      {
        title: "Travail de la brique",
        text: "Une façade en brique se répare : remplacement des briques éclatées, reprise des joints, hydrofuge. Le recouvrement systématique abîme le bâti et son cachet.",
      },
      {
        title: "Étanchéité des parkings",
        text: "Les parkings enterrés du département souffrent d'infiltrations qui attaquent les fers à béton. La reprise du complexe d'étanchéité protège la structure autant que les véhicules.",
      },
    ],
    communes: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Aulnay-sous-Bois",
      "Drancy",
      "Noisy-le-Grand",
      "Pantin",
      "Le Blanc-Mesnil",
      "Épinay-sur-Seine",
      "Bondy",
      "Sevran",
      "Rosny-sous-Bois",
      "Bagnolet",
      "Romainville",
      "Les Lilas",
      "Villepinte",
      "Bobigny",
      "Livry-Gargan",
    ],
    faq: [
      {
        question: "Quelles aides pour une isolation par l'extérieur ?",
        answer:
          "Les principaux dispositifs de la rénovation énergétique exigent de faire appel à une entreprise certifiée RGE. PMSB l'est, ce qui vous permet d'y prétendre. Le montant dépend de vos revenus, du type de bâtiment et du gain de performance visé.",
      },
      {
        question: "Faut-il recouvrir une façade en brique ?",
        answer:
          "Rarement. Une façade en brique se nettoie, les briques éclatées se remplacent et les joints se reprennent. Le recouvrement fait perdre au bâtiment son aspect d'origine et piège l'humidité dans le mur.",
      },
    ],
  },
  {
    slug: "val-de-marne-94",
    code: "94",
    name: "Val-de-Marne",
    inPhrase: "dans le Val-de-Marne",
    featured: true,
    lede: "Notre département. Le siège de PMSB est à Bonneuil-sur-Marne : c'est ici que nos délais d'intervention sont les plus courts.",
    bati: [
      "Pavillons en meulière des bords de Marne, aux parements et encadrements caractéristiques.",
      "Immeubles de rapport et petites copropriétés d'après-guerre, en enduit ou en béton.",
      "Grands ensembles des années 1960 et 1970, candidats naturels à l'isolation par l'extérieur.",
      "Balcons et terrasses exposés, dont l'étanchéité se dégrade et laisse filer l'eau dans la dalle.",
    ],
    enjeux: [
      {
        title: "Proximité immédiate",
        text: "Notre siège est à Bonneuil-sur-Marne. Sur le Val-de-Marne, la visite de diagnostic se cale rapidement et le suivi de chantier n'attend pas.",
      },
      {
        title: "Meulière et bords de Marne",
        text: "Le pavillonnaire en meulière demande un nettoyage mesuré et un rejointoiement soigné. Un décapage trop agressif ouvre la pierre et accélère sa dégradation.",
      },
      {
        title: "Balcons et infiltrations",
        text: "Un balcon dont l'étanchéité est hors d'âge laisse l'eau atteindre les aciers. Reprendre le complexe à temps coûte bien moins cher que réparer une dalle.",
      },
    ],
    communes: [
      "Créteil",
      "Vitry-sur-Seine",
      "Saint-Maur-des-Fossés",
      "Champigny-sur-Marne",
      "Ivry-sur-Seine",
      "Maisons-Alfort",
      "Villejuif",
      "Vincennes",
      "Fontenay-sous-Bois",
      "Alfortville",
      "Choisy-le-Roi",
      "Charenton-le-Pont",
      "Nogent-sur-Marne",
      "Le Kremlin-Bicêtre",
      "Cachan",
      "Bonneuil-sur-Marne",
      "Villeneuve-Saint-Georges",
      "Thiais",
    ],
    faq: [
      {
        question: "Sous quel délai pouvez-vous venir voir la façade ?",
        answer:
          "Le Val-de-Marne est notre département d'implantation : la visite de diagnostic s'organise généralement sans attente. Appelez le 06 13 40 19 01 pour convenir d'un rendez-vous.",
      },
      {
        question: "Mon balcon fuit, que faut-il refaire ?",
        answer:
          "Une infiltration vient presque toujours d'un complexe d'étanchéité arrivé en fin de vie ou endommagé. Après diagnostic, nous reprenons le support, appliquons un primaire d'accrochage, une peinture résine puis une laque de finition.",
      },
    ],
  },

  /* ── Départements couverts sans page dédiée ── */
  {
    slug: "seine-et-marne-77",
    code: "77",
    name: "Seine-et-Marne",
    inPhrase: "en Seine-et-Marne",
    featured: false,
    lede: "Pavillonnaire et petites copropriétés de l'est francilien.",
    bati: [],
    enjeux: [],
    communes: [
      "Meaux",
      "Chelles",
      "Melun",
      "Pontault-Combault",
      "Savigny-le-Temple",
      "Torcy",
      "Bussy-Saint-Georges",
    ],
    faq: [],
  },
  {
    slug: "yvelines-78",
    code: "78",
    name: "Yvelines",
    inPhrase: "dans les Yvelines",
    featured: false,
    lede: "Bâti ancien et résidences de l'ouest parisien.",
    bati: [],
    enjeux: [],
    communes: [
      "Versailles",
      "Sartrouville",
      "Mantes-la-Jolie",
      "Saint-Germain-en-Laye",
      "Poissy",
      "Conflans-Sainte-Honorine",
    ],
    faq: [],
  },
  {
    slug: "essonne-91",
    code: "91",
    name: "Essonne",
    inPhrase: "dans l'Essonne",
    featured: false,
    lede: "Copropriétés et pavillonnaire du sud francilien.",
    bati: [],
    enjeux: [],
    communes: [
      "Évry-Courcouronnes",
      "Massy",
      "Corbeil-Essonnes",
      "Sainte-Geneviève-des-Bois",
      "Savigny-sur-Orge",
      "Palaiseau",
    ],
    faq: [],
  },
  {
    slug: "val-d-oise-95",
    code: "95",
    name: "Val-d'Oise",
    inPhrase: "dans le Val-d'Oise",
    featured: false,
    lede: "Grands ensembles et pavillonnaire du nord francilien.",
    bati: [],
    enjeux: [],
    communes: [
      "Argenteuil",
      "Cergy",
      "Sarcelles",
      "Franconville",
      "Garges-lès-Gonesse",
      "Goussainville",
      "Ermont",
    ],
    faq: [],
  },
];

export const featuredDepartements = departements.filter((d) => d.featured);

export const getDepartement = (slug: string) =>
  departements.find((d) => d.slug === slug);

/** Contenu de la page « Zones d'intervention ». */
export const zones = {
  title: "Zones d'intervention",
  lede: "PMSB intervient sur toute l'Île-de-France depuis son siège de Bonneuil-sur-Marne, dans le Val-de-Marne. Ravalement de façade, isolation thermique par l'extérieur et étanchéité : nos équipes se déplacent sur les huit départements de la région.",
  paragraphs: [
    "Notre implantation à l'est de Paris nous place à proximité immédiate du Val-de-Marne, de la Seine-Saint-Denis et de la capitale, où nous réalisons la majorité de nos chantiers. Nous intervenons également sur les Hauts-de-Seine et, selon la nature des travaux, sur les quatre autres départements franciliens.",
    "Le bâti francilien n'est pas uniforme : pierre de taille parisienne, brique de Seine-Saint-Denis, meulière des bords de Marne, grands ensembles en béton des années soixante. Chaque support appelle une technique différente, et c'est cette variété que nos équipes pratiquent au quotidien.",
  ],
};
