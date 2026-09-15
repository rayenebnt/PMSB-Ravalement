"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./BeforeAfter.module.css";

interface Props {
  before: string;
  after: string;
  /** Décrit le chantier : sert à composer les deux textes alternatifs. */
  subject: string;
  sizes?: string;
  priority?: boolean;
  /** `contain` montre les photos en entier plutôt que de les rogner. */
  fit?: "cover" | "contain";
  /**
   * Position de départ de la poignée, de 0 à 100. À 0 le comparateur
   * s'ouvre sur l'après seul et n'en bouge qu'au geste du visiteur ;
   * à 50 il présente les deux états à parts égales.
   */
  start?: number;
  /**
   * Étiquettes « Avant » et « Après » dans les coins. À taire quand le
   * cadre qui accueille le comparateur porte déjà les siennes : trois
   * libellés sur une vignette se chevauchent et se brouillent.
   */
  labels?: boolean;
  /**
   * Où se prend le glissement. `surface` : n'importe où sur la photo,
   * le plus confortable. `handle` : la poignée seule, à choisir quand
   * le comparateur est posé dans un rail horizontal — le reste du
   * cadre rend alors le geste au rail, qui peut encore défiler.
   */
  grip?: "surface" | "handle";
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

/** Repère de fin de course : l'étiquette recouverte s'efface. */
type Edge = "start" | "mid" | "end";

const edgeAt = (value: number): Edge =>
  value < 14 ? "start" : value > 86 ? "end" : "mid";

export default function BeforeAfter({
  before,
  after,
  subject,
  sizes = "(max-width: 1100px) 100vw, 1400px",
  priority = false,
  fit = "cover",
  start = 50,
  labels = true,
  grip = "surface",
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const [held, setHeld] = useState(false);
  const [edge, setEdge] = useState<Edge>(() => edgeAt(start));
  const edgeRef = useRef<Edge>(edgeAt(start));

  /* La position ne transite pas par l'état React : à 60 im/s, un
     rendu par image coûterait plus cher que l'écriture directe.
     Le bord, lui, y reste : il ne bouge qu'aux deux seuils, et un
     rendu déclenché ailleurs écraserait une mutation directe. */
  const setPos = useCallback((value: number) => {
    frameRef.current?.style.setProperty("--pos", `${value}%`);

    const next = edgeAt(value);
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

  /* ── Glissement à la poignée ────────────────────────────────
     La commande native ne sait pas ne réagir qu'à une partie d'elle-
     même : quand le geste doit rester à la poignée, on le mène à la
     main et le curseur ne garde que le clavier.

     Le suivi passe par la fenêtre plutôt que par une capture de
     pointeur : celle-ci ne survit pas au rendu que déclenche le
     changement d'état, et le geste s'arrêtait au premier mouvement.
     ── */

  const dragging = useRef(false);

  const gripDown = (e: React.PointerEvent<HTMLElement>) => {
    if (grip !== "handle") return;
    e.stopPropagation(); // le rail ne doit pas défiler en même temps
    e.preventDefault(); // ni le navigateur emporter la photo en glisser-déposer
    dragging.current = true;
    setHeld(true);
  };

  useEffect(() => {
    if (grip !== "handle") return;

    const move = (e: PointerEvent) => {
      const frame = frameRef.current;
      if (!dragging.current || !frame) return;
      const box = frame.getBoundingClientRect();
      const value = Math.min(
        100,
        Math.max(0, ((e.clientX - box.left) / box.width) * 100)
      );
      setPos(value);
      if (rangeRef.current) rangeRef.current.value = String(value);
    };

    const end = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setHeld(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [grip, setPos]);

  return (
    <div
      ref={frameRef}
      className={s.frame}
      data-held={held}
      data-edge={edge}
      data-fit={fit}
      data-grip={grip}
      data-cursor="Glisser"
      style={{ "--pos": `${start}%` } as React.CSSProperties}
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
          draggable={false}
        />
      </div>

      {/* Avant : couche du dessus, rognée à la poignée */}
      <div className={`${s.layer} ${s.beforeLayer}`} aria-hidden="true">
        <Image
          src={before}
          alt=""
          fill
          sizes={sizes}
          quality={82}
          /*
           * Volet fermé au départ : le navigateur ne va pas chercher
           * une image qu'il ne peint nulle part, et le premier geste
           * découvrirait un panneau vide. On la charge donc avec la
           * page. Volet entrouvert, le chargement paresseux suffit.
           */
          loading={start < 10 ? "eager" : undefined}
          draggable={false}
        />
      </div>

      {labels && (
        <>
          <span className={`mono ${s.chip} ${s.chipBefore}`}>Avant</span>
          <span className={`mono ${s.chip} ${s.chipAfter}`}>Après</span>
        </>
      )}

      {/* Poignée décorative */}
      <div className={s.handle} aria-hidden="true">
        <span className={s.handleLine} />
        <span className={s.handleGrip} onPointerDown={gripDown}>
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
        ref={rangeRef}
        type="range"
        min={0}
        max={100}
        step={0.1}
        defaultValue={start}
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
