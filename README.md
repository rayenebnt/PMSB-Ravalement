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
app/                  Routes : /, /ravalement, /isolation, /etancheite
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
```

## Contenu

Les textes, coordonnées et visuels sont centralisés dans `lib/site.ts`.
Modifier ce fichier suffit à mettre le site à jour — aucune chaîne n'est
écrite en dur dans les composants.

## Les scènes 3D

Cinq scènes WebGL, toutes écrites à la main (aucun modèle importé) :

| Scène | Où | Principe |
| --- | --- | --- |
| `StoneWall` | Accueil | Façade en pierre de taille instanciée ; l'appareil se monte assise par assise, le curseur « ravale » la pierre encrassée |
| `Gallery3D` | Accueil | Galerie de réalisations sur plans courbes, glissable, avec franges chromatiques liées à la vitesse |
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
