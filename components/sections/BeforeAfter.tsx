"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import s from "./BeforeAfter.module.css";

interface Props {
  before: string;
  after: string;
  /** Décrit le chantier : sert à composer les deux textes alternatifs. */
  subject: string;
  sizes?: string;
  priority?: boolean;
}

/* ══════════════════════════════════════════════════════════════
   Comparateur avant / après.

   Les deux photos sont superposées ; un volet révèle l'état
   d'origine sur la gauche de la poignée. Le geste est confié à un
   `input[type=range]` transparent posé sur l'image : on hérite
   ainsi de la souris, du tactile et du clavier sans réécrire trois
   fois la même logique. La poignée visible n'est qu'un décor,
   pilotée par la variable `--pos`.
   ══════════════════════════════════════════════════════════════ */

/** Position de la poignée : au centre, comme `--pos` dans la feuille. */
const START = 50;

/** Repère de fin de course : l'étiquette recouverte s'efface. */
type Edge = "start" | "mid" | "end";

export default function BeforeAfter({
  before,
  after,
  subject,
  sizes = "(max-width: 1100px) 100vw, 1400px",
  priority = false,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [held, setHeld] = useState(false);
  const [edge, setEdge] = useState<Edge>("mid");
  const edgeRef = useRef<Edge>("mid");

  /* La position ne transite pas par l'état React : à 60 im/s, un
     rendu par image coûterait plus cher que l'écriture directe.
     Le bord, lui, y reste : il ne bouge qu'aux deux seuils, et un
     rendu déclenché ailleurs écraserait une mutation directe. */
  const setPos = useCallback((value: number) => {
    frameRef.current?.style.setProperty("--pos", `${value}%`);

    const next: Edge = value < 14 ? "start" : value > 86 ? "end" : "mid";
    if (next !== edgeRef.current) {
      edgeRef.current = next;
      setEdge(next);
    }
  }, []);

  /* Le pas fin (0,1 %) sert au glissement : aux flèches, il ferait
     traverser l'image en mille appuis. Le clavier avance donc par
     crans de 4 %. */
  const nudge = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const dir =
        e.key === "ArrowRight" || e.key === "ArrowUp"
          ? 1
          : e.key === "ArrowLeft" || e.key === "ArrowDown"
          ? -1
          : 0;
      if (!dir) return;
      e.preventDefault();
      const el = e.currentTarget;
      const next = Math.min(100, Math.max(0, Number(el.value) + dir * 4));
      el.value = String(next);
      setPos(next);
    },
    [setPos]
  );

  return (
    <div
      ref={frameRef}
      className={s.frame}
      data-held={held}
      data-edge={edge}
      data-cursor="Glisser"
    >
      {/* Après : couche du dessous, toujours entière */}
      <div className={s.layer}>
        <Image
          src={after}
          alt={`${subject} — après travaux`}
          fill
          sizes={sizes}
          quality={82}
          priority={priority}
        />
      </div>

      {/* Avant : couche du dessus, rognée à la poignée */}
      <div className={`${s.layer} ${s.beforeLayer}`} aria-hidden="true">
        <Image src={before} alt="" fill sizes={sizes} quality={82} />
      </div>

      <span className={`mono ${s.chip} ${s.chipBefore}`}>Avant</span>
      <span className={`mono ${s.chip} ${s.chipAfter}`}>Après</span>

      {/* Poignée décorative */}
      <div className={s.handle} aria-hidden="true">
        <span className={s.handleLine} />
        <span className={s.handleGrip}>
          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <path
              d="M9.5 7 5 12l4.5 5M14.5 7l4.5 5-4.5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Commande réelle : invisible, mais c'est elle qui écoute */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        defaultValue={START}
        className={s.range}
        aria-label={`${subject} : comparer l'avant et l'après`}
        onInput={(e) => setPos(Number(e.currentTarget.value))}
        onKeyDown={nudge}
        onPointerDown={() => setHeld(true)}
        onPointerUp={() => setHeld(false)}
        onPointerCancel={() => setHeld(false)}
        onLostPointerCapture={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
      />
    </div>
  );
}
