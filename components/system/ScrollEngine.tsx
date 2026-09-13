"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Moteur de défilement du site :
 * - défilement inertiel (Lenis)
 * - révélation des blocs `[data-reveal]` à l'entrée dans le viewport
 * - parallaxe des éléments `[data-speed]`
 * - exposition de la progression globale via `--scroll-progress`
 */
export default function ScrollEngine() {
  const pathname = usePathname();

  /* ── Lenis + parallaxe ───────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    let parallax: HTMLElement[] = [];
    const collect = () => {
      parallax = Array.from(
        document.querySelectorAll<HTMLElement>("[data-speed]")
      );
    };
    collect();

    const root = document.documentElement;
    let raf = 0;

    const frame = (time: number) => {
      lenis.raf(time);

      const vh = window.innerHeight || 1;
      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) continue;
        const speed = parseFloat(el.dataset.speed || "0");
        const centerOffset = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(2)}px, 0)`;
      }

      const max = document.body.scrollHeight - vh;
      root.style.setProperty(
        "--scroll-progress",
        String(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      );

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    /* Ancres internes pilotées par Lenis */
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      mo.disconnect();
      lenis.destroy();
    };
  }, [pathname]);

  /* ── Révélations ─────────────────────────────────────────── */
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const seen = new WeakSet<HTMLElement>();

    const io = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              el.classList.add("is-in");
              io!.unobserve(el);
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
        );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((node) => {
          if (seen.has(node)) return;
          seen.add(node);
          if (reduced) {
            node.classList.add("is-in");
            return;
          }
          const delay = node.dataset.revealDelay;
          if (delay) node.style.setProperty("--reveal-delay", `${delay}ms`);
          io!.observe(node);
        });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
