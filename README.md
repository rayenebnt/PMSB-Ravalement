# PMSB — site vitrine

Site de **PMSB (Prestations Multi Services Bâtiment)** : ravalement de façade,
isolation thermique par l'extérieur, étanchéité et rénovation en Île-de-France.

Next.js (App Router), TypeScript, CSS Modules et Three.js.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm start       # sert le build
```

## Structure

```
app/                  Routes : /, /ravalement, /isolation, /etancheite,
                      /realisations
  globals.css         Design system (couleurs, typographie, révélations)
components/
  layout/             Header, Footer, couverture de page, montants latéraux
  sections/           Blocs de contenu réutilisables
  system/             Primitives : défilement, curseur, grain, compteurs…
  webgl/              Scènes Three.js et shaders
lib/
  site.ts             Tout le contenu rédactionnel, en un seul endroit
  webgl.ts            Montage des scènes : rendu, redimensionnement, pause
  utils.ts            Interpolations et aléatoire déterministe
public/
  realisations/       Photos de chantier (voir ci-dessous)
```

## Contenu

Les textes, coordonnées et visuels sont centralisés dans `lib/site.ts`.
Modifier ce fichier suffit à mettre le site à jour — aucune chaîne n'est
écrite en dur dans les composants.

## Ajouter une réalisation

Les chantiers vivent dans le tableau `realisations` de `lib/site.ts`. Une
entrée suffit à alimenter les trois endroits où ils apparaissent : le rail
d'aperçu de l'accueil, la page `/realisations` et le compteur du renvoi.

```ts
{
  slug: "bardage",                     // clé de rendu et ancre : /realisations#bardage
  title: "Travaux de bardages",
  category: "Bardage",                 // pastille
  place: "Paris 75002",                // facultatif
  description: "…",
  before: "/realisations/bardage-avant.jpeg",   // facultatif
  after: "/realisations/bardage-apres.jpeg",    // obligatoire
  fit: "contain",                      // facultatif, voir ci-dessous
}
```

`before` renseigné, la fiche devient un comparateur avant / après —
glissement à la souris, au doigt ou aux flèches du clavier. `before`
absent, la fiche montre le seul résultat. Rien d'autre à toucher :
la grille place les comparateurs sur la largeur entière et élargit
la dernière fiche quand elle resterait seule sur sa ligne.

Sur l'accueil, le même tableau alimente le rail d'aperçu : photo à
pleine lumière, pastille « Avant / Après » quand il y en a un, et lien
vers la fiche correspondante (`/realisations#<slug>`).

Une vignette avant / après y est un comparateur ouvert sur l'après : il
n'en bouge qu'au geste du visiteur. Le glissement s'y prend à la poignée
seule — le reste de la photo rend le geste au rail, qui doit pouvoir
défiler même quand la vignette visible est un comparateur. Sur la fiche,
où rien ne défile à côté, la photo entière est glissable.

Par défaut la photo remplit son cadre et déborde sur les bords. Une
prise de vue verticale y perdrait toute sa hauteur : `fit: "contain"`
la bascule alors dans un cadre portrait, plus étroit et centré, où elle
tient en entier. Le cadre ne dépasse jamais la hauteur de l'écran — un
comparateur se manipule d'un seul geste, il doit rester sous les yeux.

Les photos vont dans `public/realisations/`, nommées `<slug>-avant.jpeg`
et `<slug>-apres.jpeg`. JPEG, 1600 px sur le grand côté, qualité 80. Les
deux photos d'une même paire gagnent à être cadrées pareil : le
comparateur les superpose dans un cadre unique, en `object-fit: cover`.

## La demande de devis

Le formulaire du pied de page compose un courriel et le remet au
logiciel de messagerie du visiteur : le site est statique, aucun
serveur ne peut poster le message à sa place.

Tout passe par la fonction `composer` de
`components/sections/QuoteForm.tsx`. Brancher un envoi côté serveur ne
demande que de la remplacer par un `fetch` vers une route, le reste du
formulaire — champs, validation, confirmation — ne bouge pas. Il faudra
alors un hébergement qui exécute du Node et les identifiants du service
d'envoi.

Les libellés, les familles de travaux et les textes de confirmation
vivent dans `devis`, au début de `lib/site.ts`.

## Les scènes 3D

Quatre scènes WebGL, toutes écrites à la main (aucun modèle importé) :

| Scène | Où | Principe |
| --- | --- | --- |
| `StoneWall` | Accueil | Façade en pierre de taille instanciée ; l'appareil se monte assise par assise, le curseur « ravale » la pierre encrassée |
| `GridField` | Chapitres sombres | Trame d'implantation en perspective, tracée dans le fragment shader |
| `MaterialCanvas` | Ravalement | Bloc de matière en lancer de rayons : pierre, brique, plâtre et imperméabilisation entièrement procéduraux |
| `ThermalFacade` / `ThermalWall` | Isolation | Thermographie interactive, puis coupe de mur animée avec particules de déperdition |
| `WaterSurface` | Étanchéité | Membrane satinée sous la pluie, ondes analytiques réagissant au curseur |

Chaque scène est montée via `lib/webgl.ts`, qui met la boucle de rendu en
pause hors du viewport et quand l'onglet est masqué, et libère toutes les
ressources au démontage. Les scènes sont chargées en `next/dynamic` sans
rendu serveur : sans WebGL, la page reste complète et lisible.

## Accessibilité et performance

- `prefers-reduced-motion` désactive le préchargeur, le défilement inertiel,
  les révélations, les bandeaux défilants et les gouttes de pluie.
- Tous les textes restent dans le flux HTML : les animations ne portent que
  sur la présentation.
- Les scènes 3D sont décoratives ou illustratives et marquées `aria-hidden`
  lorsqu'elles n'apportent pas d'information textuelle.

## Note d'implémentation

Un composant client monté par une Server Component devient un *point
d'entrée client* : Next lui associe une entrée de manifeste et un chunk.
Si ce même module exporte aussi un utilitaire importé par d'autres
composants clients, il se retrouve dupliqué dans un chunk asynchrone qui
peut s'exécuter avant ses dépendances — l'hydratation échoue alors par
intermittence.

C'est pourquoi le signal de fin de préchargement vit dans
`components/system/siteReady.ts` et non dans `Preloader.tsx` : le
composant reste un point d'entrée pur, le hook une dépendance partagée.
Garder cette séparation en ajoutant de nouveaux composants clients.
