"use client";

import { useEffect, useState } from "react";

/**
 * Signal de fin de préchargement.
 *
 * Volontairement séparé du composant Preloader : celui-ci est monté par
 * une Server Component, ce qui en fait un point d'entrée client. Garder
 * le hook dans un module distinct évite que la même unité serve à la
 * fois de point d'entrée et de dépendance partagée.
 */
export const READY_EVENT = "pmsb:ready";

/** Marque le site comme prêt et prévient les scènes qui attendent. */
export function markReady() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(READY_EVENT));
}

/** true dès que le préchargement est terminé. */
export function useSiteReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.loaded === "true") {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener(READY_EVENT, on);
    return () => window.removeEventListener(READY_EVENT, on);
  }, []);

  return ready;
}
