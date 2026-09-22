"use client";

import dynamic from "next/dynamic";

const GridField = dynamic(() => import("./GridField"), { ssr: false });

/**
 * Enveloppe cliente de la trame 3D, pour qu'une page rendue côté serveur
 * puisse l'utiliser comme fond de couverture.
 */
export default function GridBackdrop() {
  return <GridField />;
}
