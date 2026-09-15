"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionHead from "../system/SectionHead";
import BeforeAfter from "./BeforeAfter";
import Magnetic from "../system/Magnetic";
import { realisations } from "@/lib/site";
import s from "./Realisations.module.css";

/* ══════════════════════════════════════════════════════════════
   Aperçu des chantiers sur l'accueil.

   Un rail horizontal qui défile nativement, avec aimantation. Les
   photos restent à pleine lumière : c'est le sujet, rien ne doit
   les voiler. Chaque vignette mène à sa fiche complète.

   Le défilement est celui du navigateur — pas une piste transformée
   à la main : le doigt, le pavé tactile et le clavier fonctionnent
   sans code, et Lenis laisse passer les gestes horizontaux.
   ══════════════════════════════════════════════════════════════ */

export default function Realisations() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const total = realisations.length;
  const comparable = realisations.filter((r) => r.before).length;

  /* Position dans le rail : barre de progression et bornes des flèches */
  const readScroll = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(max - el.scrollLeft < 8);
  }, []);

  useEffect(() => {
    readScroll();
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(readScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [readScroll]);

  /** Avance d'une vignette, dans un sens ou dans l'autre. */
  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${s.card}`);
    const width = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  /* Glisser à la souris : le tactile et le pavé gardent le natif. */
  const drag = useRef({ active: false, x: 0, left: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = railRef.current;
    if (!el) return;
    drag.current = { active: true, x: e.clientX, left: el.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!drag.current.active || !el) return;
    const travel = e.clientX - drag.current.x;
    if (Math.abs(travel) > 4) el.setPointerCapture?.(e.pointerId);
    el.scrollLeft = drag.current.left - travel;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    railRef.current?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <section className={`section ${s.section}`} id="realisations">
      <div className="shell">
        <SectionHead
          index="03"
          tag="Ce que nous avons accompli"
          title="Nos réalisations"
          lede="Façades parisiennes remises à neuf : piochage, ravalement à la chaux, bardage, zinguerie. Cliquez sur un chantier pour le voir en grand."
        />
      </div>

      <div
        ref={railRef}
        className={s.rail}
        role="region"
        aria-label="Aperçu des chantiers"
        tabIndex={0}
        onScroll={readScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {realisations.map((item, i) => {
          const repere = (
            <>
              <span className={`mono ${s.number}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.before && (
                <span className={`mono ${s.badge}`}>Avant / Après</span>
              )}
            </>
          );

          const legende = (
            <Link href={`/realisations#${item.slug}`} className={s.legend}>
              <h3 className={`display ${s.title}`}>{item.title}</h3>
              <span className={`mono ${s.place}`}>
                {item.place ?? item.category}
              </span>
            </Link>
          );

          /*
           * Chantier photographié aux deux étapes : la vignette devient
           * un comparateur, ouvert sur l'après. Le média ne peut alors
           * plus être un lien — le clic servirait à la fois à glisser
           * la poignée et à changer de page ; c'est la légende qui mène
           * à la fiche. Le glissement se prend à la poignée seule : le
           * reste de la photo rend le geste au rail, qui doit pouvoir
           * défiler même quand la carte visible est un comparateur.
           */
          if (item.before) {
            return (
              <article key={item.slug} className={s.card}>
                <div className={s.media}>
                  <BeforeAfter
                    before={item.before}
                    after={item.after}
                    subject={item.title}
                    sizes="(max-width: 700px) 78vw, (max-width: 1200px) 42vw, 30vw"
                    start={0}
                    labels={false}
                    grip="handle"
                  />
                  {repere}
                </div>
                {legende}
              </article>
            );
          }

          return (
            <article key={item.slug} className={s.card}>
              <Link
                href={`/realisations#${item.slug}`}
                className={`frame ${s.media}`}
                data-cursor="Voir"
              >
                <Image
                  src={item.after}
                  alt={`${item.title}${item.place ? ` — ${item.place}` : ""}`}
                  fill
                  sizes="(max-width: 700px) 78vw, (max-width: 1200px) 42vw, 30vw"
                  quality={82}
                  draggable={false}
                />
                {repere}
              </Link>
              {legende}
            </article>
          );
        })}

        {/* Repère de fin : la marge droite du dernier élément */}
        <span className={s.railEnd} aria-hidden="true" />
      </div>

      <div className={`shell ${s.controls}`}>
        <div className={s.track} aria-hidden="true">
          <span
            className={s.trackFill}
            style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
          />
        </div>

        <div className={s.arrows}>
          <button
            type="button"
            className={s.arrow}
            onClick={() => step(-1)}
            disabled={atStart}
          >
            <span className="sr-only">Chantier précédent</span>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={s.arrow}
            onClick={() => step(1)}
            disabled={atEnd}
          >
            <span className="sr-only">Chantier suivant</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={`shell ${s.footer}`}>
        <span className={`mono ${s.count}`}>
          {total} chantiers en ligne
          {comparable > 0 && ` — dont ${comparable} en avant / après`}
        </span>

        <Magnetic strength={0.18} radius={60}>
          <Link href="/realisations" className={`btn btn-solid ${s.cta}`}>
            Voir toutes les réalisations
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
