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
  address: "94380 Bonneuil-Sur-Marne",
  linkedin: "https://www.linkedin.com/in/sarl-pmsb-740726280/",
  copyright: "© Copyright 2023 PMSB",
};

export const nav = [
  { label: "Accueil", href: "/", index: "01" },
  { label: "Ravalement", href: "/ravalement", index: "02" },
  { label: "Isolation", href: "/isolation", index: "03" },
  { label: "Étanchéité", href: "/etancheite", index: "04" },
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

export const realisations = [
  {
    image: "/qui1.jpg",
    text: "Piochage total et refait en Saint Acier, Paris 75018",
    place: "Paris 75018",
  },
  {
    image: "/imagebien3.JPG",
    text: "Ravalement Chaux Sable, Paris 75008",
    place: "Paris 75008",
  },
  {
    image: "/image_real.JPG",
    text: "Travaux de Ravalement et de Zinguerie, Paris 75002",
    place: "Paris 75002",
  },
];

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
