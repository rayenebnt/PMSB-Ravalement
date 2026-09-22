/**
 * Source unique de vérité pour tout le contenu rédactionnel du site.
 * Les textes sont repris à l'identique de l'ancienne version du site.
 */

export const company = {
  name: "PMSB",
  legalName: "Prestations Multi Services Bâtiment",
  tagline: "Entreprise de ravalement et de façade",
  area: "Région Parisienne",
  phone: "06 13 40 19 01",
  phoneHref: "tel:+33613401901",
  email: "pmsb.pmsb@yahoo.fr",
  emailHref: "mailto:pmsb.pmsb@yahoo.fr",
  address: "94380 Bonneuil-sur-Marne",
  linkedin: "https://www.linkedin.com/in/sarl-pmsb-740726280/",
  copyright: "© Copyright 2026 PMSB",
};

/* ── Demande de devis ────────────────────────────────────────── */

export const devis = {
  tag: "Demande de devis",
  title: "Décrivez votre chantier",
  lede:
    "Quelques lignes suffisent pour un premier chiffrage. Nous répondons sous 48 heures ouvrées.",
  /** Familles de travaux proposées dans la liste déroulante. */
  travaux: [
    "Ravalement de façade",
    "Isolation thermique par l'extérieur",
    "Étanchéité",
    "Travaux de rénovation",
    "Autre / je ne sais pas encore",
  ],
  submit: "Envoyer la demande",
  /** Affiché une fois le message remis au logiciel de messagerie. */
  confirmation:
    "Votre message est prêt dans votre logiciel de messagerie : il ne reste qu'à l'envoyer. Rien ne s'ouvre ? Écrivez-nous directement.",
};

export const nav = [
  { label: "Accueil", href: "/", index: "01", short: "Accueil" },
  { label: "Ravalement", href: "/ravalement", index: "02", short: "Ravalement" },
  { label: "Isolation", href: "/isolation", index: "03", short: "Isolation" },
  { label: "Étanchéité", href: "/etancheite", index: "04", short: "Étanchéité" },
  {
    label: "Réalisations",
    href: "/realisations",
    index: "05",
    short: "Réalisations",
  },
  {
    label: "Zones d'intervention",
    href: "/zones-d-intervention",
    index: "06",
    short: "Zones",
  },
];

export const homeAnchors = [
  { label: "Services", href: "/#services" },
  { label: "Qui sommes-nous ?", href: "/#qui-sommes-nous" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Contact", href: "/#contact" },
];

export const stats = [
  { value: 15, suffix: "+", label: "Années d'expérience" },
  { value: 500, suffix: "+", label: "Chantiers réalisés" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: null, text: "RGE", label: "Certification qualité" },
] as const;

export const servicesIntro =
  "Vous désirez redonner une nouvelle vie à votre logement ? Profitez de notre expérience éprouvée dans diverses branches des travaux de bâtiment. Nous réalisons à la demande de nos clients des rénovations qui prennent en compte le ravalement de façade, l'isolation thermique, l'étanchéité, mais aussi la peinture et la décoration de votre intérieur.";

export const services = [
  {
    number: "01",
    title: "Ravalement",
    description:
      "Notre équipe d'experts se charge du ravalement de votre façade.",
    image: "/new-ravalement.jpg",
    href: "/ravalement",
  },
  {
    number: "02",
    title: "Isolation thermique",
    description:
      "Nous utilisons les meilleurs matériaux pour vos travaux d'isolation.",
    image: "/new-isolation.jpg",
    href: "/isolation",
  },
  {
    number: "03",
    title: "Étanchéité",
    description:
      "Nous nous occupons de la parfaite étanchéité de vos balcons et terrasses.",
    image: "/new-etancheite.jpg",
    href: "/etancheite",
  },
  {
    number: "04",
    title: "Travaux de rénovations",
    description:
      "Nous nous occupons des travaux ainsi que la peinture et la décoration d'intérieur.",
    image: "/new-renovation.jpg",
    href: null,
  },
];

export const about = {
  title: "Qui sommes nous ?",
  tag: "À propos de nous",
  image: "/new-about.jpg",
  imageAlt: "Équipe PMSB sur chantier en région parisienne",
  paragraph:
    "PMSB, Prestations Multi Services Bâtiment, est une entreprise spécialisée dans la réalisation de divers travaux de bâtiment dans la région Parisienne. Elle met à votre service ses compétences pour l'exécution d'un ravalement de façade, de travaux d'isolation, d'une peinture d'intérieur ou encore la rénovation totale de votre logement. Comptez sur notre savoir-faire pour obtenir un travail soigné.",
};

/* ── Réalisations ────────────────────────────────────────────── */

/**
 * Un chantier livré.
 *
 * Deux formes possibles, l'affichage s'adapte seul :
 * — `before` renseigné → la fiche devient un comparateur avant / après ;
 * — `before` absent    → la fiche montre le seul résultat.
 *
 * Pour ajouter un chantier : déposer les photos dans
 * `public/realisations/` puis compléter le tableau ci-dessous.
 */
export interface Realisation {
  /** Identifiant stable : clé de rendu et ancre de la fiche. */
  slug: string;
  title: string;
  /** Famille de travaux, affichée en pastille. */
  category: string;
  /** Localisation, lorsqu'elle est connue. */
  place?: string;
  description: string;
  /** Photo avant travaux. Omise quand seul le résultat a été photographié. */
  before?: string;
  /** Photo après travaux : toujours renseignée. */
  after: string;
  /**
   * Cadrage sur la page Réalisations. Par défaut la photo remplit le
   * cadre, quitte à être rognée sur les bords. `contain` la montre en
   * entier dans un cadre portrait plus étroit : à réserver aux prises
   * de vue verticales, qu'un cadre large amputerait de leur hauteur.
   */
  fit?: "cover" | "contain";
}

export const realisations: Realisation[] = [
  {
    slug: "bardage",
    title: "Travaux de bardages",
    category: "Bardage",
    description:
      "Reprise intégrale d'une façade en brique : préparation du support, pose du treillis d'armature et encadrement des menuiseries, puis finition enduite. La façade est uniformisée et protégée sur toute sa hauteur.",
    before: "/realisations/bardage-avant.jpeg",
    after: "/realisations/bardage-apres.jpeg",
  },
  {
    slug: "clinique",
    title: "Ravalement complet d'une clinique",
    category: "Ravalement",
    description:
      "Réhabilitation de la façade d'un établissement de santé sur toute sa hauteur : dépose de l'ancien parement nervuré, reprise du support puis finition enduite claire. Le bâtiment passe d'un habillage vieilli à une façade lisse et uniforme.",
    before: "/realisations/clinique-avant.jpeg",
    after: "/realisations/clinique-apres.jpeg",
    fit: "contain",
  },
  {
    slug: "pignon",
    title: "Travaux de rénovation d'un pignon",
    category: "Ravalement",
    description:
      "Remise à neuf d'un mur pignon sur toute sa hauteur : piochage des parties dégradées, ragréage du support puis enduit de finition teinté. Le pignon retrouve une surface homogène, à l'abri des infiltrations.",
    after: "/realisations/pignon-apres.jpeg",
  },
  {
    slug: "renovation-parisienne",
    title: "Rénovation à la parisienne",
    category: "Ravalement",
    description:
      "Ravalement traditionnel d'un immeuble de rue : enduit à la chaux, reprise des corniches et des appuis, remise en peinture des ferronneries. Un rendu fidèle à l'écriture parisienne du bâti ancien.",
    after: "/realisations/parisienne-apres.jpeg",
  },
  {
    slug: "cheminee",
    title: "Travaux sur une cheminée",
    category: "Ravalement · Couverture",
    description:
      "Reprise d'une souche de cheminée en couronnement de toiture : réfection de l'enduit, restitution du couronnement mouluré et remise en état des mitrons. L'intervention se fait depuis un échafaudage, sans toucher à la couverture en ardoise.",
    after: "/realisations/cheminee-apres.jpeg",
  },
  {
    slug: "poncage-marbre",
    title: "Travaux de ponçage sur marbre",
    category: "Pierre",
    description:
      "Ponçage des parements en marbre d'une résidence, étage par étage. Le grain est repris sur toute la façade : l'encrassement disparaît et la pierre retrouve sa teinte d'origine sans être recouverte.",
    after: "/realisations/poncage-marbre-apres.jpeg",
  },
  {
    slug: "ravalement-brique",
    title: "Travaux de ravalement sur brique",
    category: "Brique",
    description:
      "Ravalement d'une façade en brique polychrome : nettoyage du parement, reprise des joints et des appuis en pierre, puis remise en peinture du soubassement. Le damier rouge et jaune ressort à nouveau sur toute la hauteur.",
    after: "/realisations/ravalement-brique-apres.jpeg",
  },
  {
    slug: "saint-acier-75018",
    title: "Piochage total et refait en Saint Acier",
    category: "Ravalement",
    place: "Paris 75018",
    description:
      "Dépose complète de l'ancien enduit puis reprise en Saint Acier, du soubassement à la corniche.",
    after: "/qui1.jpg",
  },
  {
    slug: "chaux-sable-75008",
    title: "Ravalement chaux sable",
    category: "Ravalement",
    place: "Paris 75008",
    description:
      "Ravalement à la chaux et au sable, taloché sur l'ensemble de la façade sur rue.",
    after: "/imagebien3.JPG",
  },
  {
    slug: "zinguerie-75002",
    title: "Ravalement et zinguerie",
    category: "Ravalement · Zinguerie",
    place: "Paris 75002",
    description:
      "Ravalement de la façade accompagné de la reprise des ouvrages de zinguerie en couverture.",
    after: "/image_real.JPG",
  },
];

export const realisationsPage = {
  title: "Réalisations",
  introParagraphs: [
    "Chaque chantier laisse une trace : un pignon repris, une façade parisienne retrouvée, une façade en brique entièrement réhabillée. Voici une sélection de nos interventions en région parisienne.",
    "Lorsque les photos d'avant travaux existent, faites glisser la poignée au centre de l'image pour découvrir le résultat.",
  ],
  markers: ["Avant / après comparables", "Chantiers livrés", "Région parisienne"],
  /** Mode d'emploi du comparateur, affiché au-dessus de la liste. */
  hint: "Glissez la poignée pour comparer l'avant et l'après.",
};

/* ── Page Ravalement ─────────────────────────────────────────── */

export const ravalement = {
  title: "Ravalement",
  intro:
    "N'exécute pas un ravalement de façade qui veut. C'est une prestation qui nécessite la possession de certaines connaissances techniques et d'une expérience éprouvée. Nettoyer, décaper, repeindre : aucun pan des travaux de ravalement n'échappe à notre savoir-faire.",
  sectionTitle: "Nos différentes expertises",
  sectionText:
    "Nous mettons tout le nécessaire en œuvre pour vous offrir des travaux de ravalement de haute qualité.",
  expertises: [
    {
      variant: 0,
      image: "/pierre.jpg",
      title: "Pierre de taille",
      description:
        "Reconstituer une pierre désagrégée, des décors ou modénatures, faire une retaille de la pierre ou une incrustation nécessite des experts compétents. PMSB est compétente pour la pierre de taille.",
    },
    {
      variant: 1,
      image: "/brique.jpg",
      title: "Brique",
      description:
        "Le travail de la brique est une spécialité particulière des travaux de ravalement. La rénovation d'une telle façade demande une compétence particulière que dispose notre entreprise.",
    },
    {
      variant: 2,
      image: "/platre.jpg",
      title: "Plâtre",
      description:
        "Le travail de plâtrerie en ravalement est particulièrement délicat car il est exposé aux intempéries et à la lumière. Cela demande une équipe spécialisée et formée à ce type d'ouvrage.",
    },
    {
      variant: 3,
      image: "/impermeable.jpg",
      title: "Imperméabilisation",
      description:
        "L'imperméabilisation d'une façade est un ouvrage délicat qui requiert des qualifications précises. Nous prenons en charge les 4 niveaux différents d'imperméabilité de façade (I1, I2, I3, I4).",
    },
  ],
};

export const rge = {
  badge: "Certification officielle",
  title: "Entreprise certifiée RGE",
  descriptionLead: "Notre entreprise est certifiée ",
  descriptionStrong: "RGE — Reconnu Garant de l'Environnement",
  descriptionRest:
    ", mention de qualité délivrée aux professionnels du bâtiment dans le domaine de l'efficacité énergétique et des énergies renouvelables.",
  points: [
    "Gage de crédibilité pour vos travaux de performance énergétique",
    "Accès aux aides financières de la transition énergétique",
    "Expertise reconnue par l'État en rénovation énergétique",
  ],
  logo: "/certification-rge.png",
};

/* ── Page Isolation ──────────────────────────────────────────── */

export const isolation = {
  title: "Isolation Thermique",
  introParagraphs: [
    "Une maison bien isolée accroît son niveau de confort. En outre, cela permet de réaliser des économies d'énergie importantes.",
    "On avance des réductions qui tournent autour de 30 %. Vous avez donc pleinement raison de vous soucier de l'isolation de votre logement.",
    "Pour identifier le meilleur matériau, la technique adaptée à votre habitation, fiez-vous au professionnalisme de PMSB. Nous nous appliquerons à mettre en œuvre vos souhaits et à renforcer les performances énergétiques de votre bien.",
  ],
  sectionTitle: "Nos différents matériaux",
  sectionText:
    "Notre équipe d'experts met tout en œuvre pour vous garantir une isolation thermique de haute qualité.",
  materials: [
    {
      image: "/laine.jpg",
      title: "Laine de roche",
      description:
        "La laine de roche est essentiellement composée de matière minérale comme le basalte. On peut donc la qualifier de matériau écologique, d'autant que son bilan carbone devient positif très peu de temps après sa mise en œuvre comme isolant.",
    },
    {
      image: "/isolation.png",
      title: "Le polystyrène",
      description:
        "Le polystyrene est un produit qui a de multiples avantages pour isoler vos murs et éviter ainsi les déperditions énergétiques tout en apportant un confort thermique. Économique et performant, c'est le matériau incontournable pour vos travaux !",
    },
    {
      image: "/graphité.jpg",
      title: "Le graphité",
      description:
        "Le graphité permet de lutter contre les ponts thermiques et les moisissures dans les intérieurs à condition que la ventilation intérieure soit correctement réglée. De plus, ce matériau permet une meilleure isolation acoustique.",
    },
    {
      image: "/Rénovation.png",
      title: "Des matériaux de haute qualité",
      description:
        "Chez PMSB, la qualité est au centre de notre travail. Isoler les murs de son immeuble permet de limiter les déperditions d'énergie, d'améliorer le confort thermique et d'avoir une meilleure isolation acoustique.",
    },
  ],
  benefitsTitle: "Pourquoi isoler ses murs par l'extérieur ?",
  benefits: [
    {
      number: "01",
      title: "Économiser",
      text: "En réduisant les besoins en chauffage et en climatisation, l'isolation extérieure permet de réaliser des économies importantes sur les factures d'énergie à long terme.",
    },
    {
      number: "02",
      title: "Efficacité",
      text: "L'isolation extérieure réduit considérablement les pertes de chaleur par les murs, ce qui permet de maintenir une température intérieure plus constante et de réduire la consommation d'énergie pour le chauffage ou la climatisation.",
    },
    {
      number: "03",
      title: "Valeur",
      text: "Une meilleure efficacité énergétique et un meilleur confort peuvent augmenter la valeur de votre maison sur le marché immobilier.",
    },
    {
      number: "04",
      title: "Esthétique",
      text: "L'isolation extérieure permet également de rafraîchir l'apparence extérieure de votre maison en la recouvrant d'un nouveau revêtement, ce qui peut améliorer son attrait visuel.",
    },
    {
      number: "05",
      title: "Durabilité",
      text: "En protégeant les murs extérieurs contre les intempéries et en réduisant les risques de dégradation, l'isolation extérieure prolonge la durée de vie de votre maison.",
    },
    {
      number: "06",
      title: "Acoustique",
      text: "L'isolation extérieure peut également réduire la transmission du bruit de l'extérieur vers l'intérieur de la maison, améliorant ainsi le confort acoustique.",
    },
  ],
};

/* ── Page Étanchéité ─────────────────────────────────────────── */

export const etancheite = {
  title: "Étanchéité",
  introParagraphs: [
    "Notre équipe d'experts chez PMSB s'engage à vous offrir des solutions durables pour la rénovation de vos terrasses et balcons, en empêchant toute infiltration d'eau nuisible.",
    "Que votre complexe d'étanchéité soit devenu obsolète ou endommagé, nous avons l'expertise pour mettre en œuvre des systèmes modernes garantissant une étanchéité optimale. Votre tranquillité d'esprit est notre priorité.",
  ],
  typesTitle: "Nos types d'étanchéité",
  types: [
    {
      image: "/balcon2.jpg",
      title: "Balcon",
      description:
        "L'étanchéité des balcons est essentielle pour empêcher les infiltrations d'eau, protéger la structure, et garantir la durabilité du balcon.",
    },
    {
      image: "/cave2.jpg",
      title: "Cave",
      description:
        "L'étanchéité des caves est cruciale pour éviter les infiltrations d'eau, protéger les fondations, et préserver l'intégrité structurelle de la cave.",
    },
    {
      image: "/parking2.jpg",
      title: "Parking",
      description:
        "L'étanchéité des parkings est vitale pour empêcher les infiltrations d'eau, préserver l'intégrité structurelle du parking, et assurer sa durabilité.",
    },
  ],
  productsTitle: "Les produits utilisés",
  products: [
    {
      image: "/primaire.jpg",
      title: "Produit primaire d'accrochage",
      description:
        "Le produit primaire d'accrochage assure une adhérence solide entre la surface préparée et les revêtements ultérieurs, améliorant la durabilité et prévenant les décollements prématurés des revêtements d'étanchéité.",
    },
    {
      image: "/Stocorr.jpg",
      title: "Peinture résine",
      description:
        "La peinture résine, faite de résines synthétiques, offre une protection robuste contre les intempéries, les UV, les produits chimiques et l'abrasion, tout en préservant l'esthétique.",
    },
    {
      image: "/laque.jpg",
      title: "Laque de finition",
      description:
        "La laque de finition est un revêtement lisse et brillant composé de résines, offrant une protection durable et améliorant l'esthétique de surfaces telles que le bois, le métal, et les meubles.",
    },
  ],
};

/* ── Méthode de travail (structure les prestations déjà décrites) ── */

export const method = [
  {
    number: "01",
    title: "Diagnostic",
    text: "Visite du bâtiment, relevé de l'état des supports et identification des pathologies de façade avant toute intervention.",
  },
  {
    number: "02",
    title: "Préparation",
    text: "Nettoyage, décapage, piochage des parties dégradées : le support est remis à nu pour recevoir les nouveaux ouvrages.",
  },
  {
    number: "03",
    title: "Exécution",
    text: "Pierre de taille, brique, plâtre, isolation ou étanchéité : chaque ouvrage est réalisé par une équipe formée à la technique concernée.",
  },
  {
    number: "04",
    title: "Finition",
    text: "Imperméabilisation, peinture et décoration : la façade retrouve son aspect d'origine et sa protection durable.",
  },
];

/* ── Questions fréquentes ─────────────────────────────────────── */

export interface FaqItem {
  question: string;
  answer: string;
}

/** Page d'accueil : les questions posées avant même de choisir un métier. */
export const faqGenerale: FaqItem[] = [
  {
    question: "Dans quelles villes intervenez-vous ?",
    answer:
      "PMSB intervient sur toute l'Île-de-France depuis son siège de Bonneuil-sur-Marne (94). Nous travaillons principalement à Paris, dans le Val-de-Marne, en Seine-Saint-Denis et dans les Hauts-de-Seine, et nous nous déplaçons également sur la Seine-et-Marne, les Yvelines, l'Essonne et le Val-d'Oise.",
  },
  {
    question: "Le ravalement de façade est-il obligatoire ?",
    answer:
      "Une commune peut enjoindre un propriétaire de faire ravaler sa façade, en principe tous les dix ans, au titre de l'article L.132-1 du Code de la construction et de l'habitation. L'obligation dépend donc de la commune. Au-delà du cadre légal, un ravalement régulier protège le mur des infiltrations et évite des reprises bien plus lourdes.",
  },
  {
    question: "Combien coûte un ravalement de façade ?",
    answer:
      "Le prix dépend de la surface, de la nature du support, de l'état de la façade, du type de finition et des moyens d'accès. Deux immeubles voisins peuvent afficher des budgets très différents. Nous établissons un devis détaillé, poste par poste, après une visite sur place.",
  },
  {
    question: "Qu'apporte la certification RGE ?",
    answer:
      "RGE signifie Reconnu Garant de l'Environnement. C'est une mention de qualité délivrée aux professionnels du bâtiment dans le domaine de l'efficacité énergétique. Elle conditionne l'accès à la plupart des aides à la rénovation énergétique : sans entreprise RGE, ces aides ne sont pas mobilisables.",
  },
  {
    question: "Travaillez-vous pour les copropriétés ?",
    answer:
      "Oui, comme pour les propriétaires particuliers. Pour une copropriété, nous fournissons un devis détaillé poste par poste, directement exploitable lors de l'assemblée générale, et nous tenons le syndic informé pendant toute la durée du chantier.",
  },
  {
    question: "Combien de temps dure un chantier ?",
    answer:
      "Cela dépend de la surface, de l'état du support et de la météo — un enduit ne s'applique ni par gel ni sous la pluie. La durée prévisionnelle est annoncée avec le devis, après diagnostic.",
  },
];

export const faqRavalement: FaqItem[] = [
  {
    question: "Quelles façades savez-vous traiter ?",
    answer:
      "Pierre de taille, brique, plâtre et supports enduits. Chacune demande une technique propre : reconstitution et retaille pour la pierre, remplacement et rejointoiement pour la brique, reprise d'enduit pour le plâtre. Nous prenons également en charge l'imperméabilisation de façade.",
  },
  {
    question: "Que recouvrent les classes I1 à I4 ?",
    answer:
      "Ce sont les quatre niveaux d'imperméabilité de façade. Ils vont du simple rafraîchissement à un revêtement capable de ponter des fissures actives. Le niveau retenu dépend de l'état du support et des fissures constatées au diagnostic. Nous prenons en charge les quatre.",
  },
  {
    question: "Faut-il une autorisation pour ravaler une façade ?",
    answer:
      "Une déclaration préalable de travaux est généralement nécessaire, et les contraintes se durcissent en secteur protégé ou aux abords d'un monument historique. Si l'échafaudage empiète sur la voirie, une autorisation d'occupation s'y ajoute. Nous vous accompagnons sur ces démarches.",
  },
];

export const faqIsolation: FaqItem[] = [
  {
    question: "Isolation par l'extérieur ou par l'intérieur ?",
    answer:
      "L'isolation par l'extérieur traite les ponts thermiques, ne réduit pas la surface habitable et rafraîchit l'aspect du bâtiment, puisqu'elle se termine par un enduit de finition. Elle se prête particulièrement à une opération couplée avec un ravalement.",
  },
  {
    question: "Quel isolant choisir ?",
    answer:
      "La laine de roche est minérale et performante au feu comme en acoustique. Le polystyrène est économique et efficace sur les déperditions. Le graphité limite les ponts thermiques et améliore l'isolation acoustique. Le choix se fait après diagnostic, selon le support, l'épaisseur disponible et le niveau de performance visé.",
  },
  {
    question: "Quelles économies peut-on attendre ?",
    answer:
      "Les réductions avancées tournent autour de 30 %. Le gain réel dépend de l'isolation existante, du mode de chauffage et des usages du logement. Au-delà de la facture, l'isolation extérieure stabilise la température intérieure et supprime l'effet de paroi froide.",
  },
];

export const faqEtancheite: FaqItem[] = [
  {
    question: "Comment savoir si mon balcon doit être repris ?",
    answer:
      "Traces d'humidité au plafond du niveau inférieur, efflorescences, revêtement qui cloque ou se décolle, fissures en nez de dalle : ce sont les signes d'un complexe d'étanchéité arrivé en fin de vie. Plus la reprise tarde, plus l'eau atteint les aciers de la dalle.",
  },
  {
    question: "Quels ouvrages traitez-vous ?",
    answer:
      "Balcons, terrasses, caves et parkings. Ce sont les ouvrages les plus exposés aux infiltrations, et ceux dont la structure souffre le plus vite lorsque l'eau passe.",
  },
  {
    question: "Quels produits mettez-vous en œuvre ?",
    answer:
      "Un primaire d'accrochage pour lier le support et les couches suivantes, une peinture résine qui protège des intempéries, des UV et de l'abrasion, puis une laque de finition qui scelle l'ensemble et soigne l'aspect.",
  },
];
