"use client";

import { useEffect, useRef, useState } from "react";
import s from "./Cursor.module.css";

/**
 * Curseur composé : un point qui colle au pointeur et un anneau
 * qui le suit avec de l'inertie. Les éléments portant
 * `data-cursor="TEXTE"` transforment l'anneau en pastille libellée.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const soft = { x: target.x, y: target.y };
    let raf = 0;
    let last = performance.now();
    // L'élément survolé, gardé entre deux mouvements : certains changent
    // leur libellé sous un pointeur immobile.
    let over: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button"
      ) as HTMLElement | null;

      over = el;
      if (!el) {
        setActive(false);
        setLabel("");
        return;
      }
      setActive(true);
      setLabel(el.dataset?.cursor ?? "");
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      const k = 1 - Math.exp((-(now - last) / 1000) * 11);
      last = now;
      soft.x += (target.x - soft.x) * k;
      soft.y += (target.y - soft.y) * k;

      if (over) setLabel(over.dataset?.cursor ?? "");

      if (dot.current)
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${soft.x}px, ${soft.y}px, 0) translate(-50%, -50%)`;
    };
    raf = requestAnimationFrame(loop);

    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className={s.root} aria-hidden="true" data-visible={visible}>
      <div ref={dot} className={s.dot} data-hidden={!!label} />
      <div
        ref={ring}
        className={s.ring}
        data-active={active}
        data-labelled={!!label}
      >
        <span className={s.label}>{label}</span>
      </div>
    </div>
  );
}
