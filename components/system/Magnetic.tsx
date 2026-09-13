"use client";

import { cloneElement, useEffect, useRef, type ReactElement } from "react";

interface Props {
  children: ReactElement;
  /** Amplitude de l'attraction, 0 → 1. */
  strength?: number;
  /** Rayon d'accroche autour de l'élément, en pixels. */
  radius?: number;
}

/**
 * Attire l'élément enfant vers le curseur quand il s'en approche.
 */
export default function Magnetic({
  children,
  strength = 0.32,
  radius = 90,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches)
      return;

    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const loop = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      if (Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reach = Math.max(r.width, r.height) / 2 + radius;
      if (Math.hypot(dx, dy) > reach) {
        target.x = 0;
        target.y = 0;
      } else {
        target.x = dx * strength;
        target.y = dy * strength;
      }
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return cloneElement(children, { ref } as never);
}
