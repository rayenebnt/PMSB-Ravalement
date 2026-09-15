"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, homeAnchors, nav } from "@/lib/site";
import Magnetic from "../system/Magnetic";
import s from "./Header.module.css";

const preview: Record<string, string> = {
  "/": "/new-hero.jpg",
  "/ravalement": "/new-ravalement.jpg",
  "/isolation": "/new-isolation.jpg",
  "/etancheite": "/new-etancheite.jpg",
  "/realisations": "/realisations/bardage-apres.jpg",
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  /* Fermeture à chaque changement de page */
  useEffect(() => setOpen(false), [pathname]);

  /* Verrou du scroll pendant l'ouverture du menu */
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  /* Échap pour fermer */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Teinte du bandeau : clair au-dessus du hero, opaque ensuite */
  useEffect(() => {
    const sentinel = document.querySelector("[data-header-sentinel]");
    if (!sentinel) {
      setOverHero(false);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting || entry.boundingClientRect.top > 0),
      { rootMargin: "-72px 0px 0px 0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  /* Masquage au défilement vers le bas */
  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > prev && y > 260);
      prev = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Vignette qui suit le curseur dans le menu */
  useEffect(() => {
    if (!open) return;
    const onMove = (e: PointerEvent) => {
      const el = followerRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [open]);

  return (
    <>
      <header
        className={s.header}
        data-over-hero={overHero && !open}
        data-open={open}
        data-hidden={hidden && !open}
      >
        <div className={s.inner}>
          <Link href="/" className={s.logo} aria-label="PMSB — Accueil">
            <img src="/Logo.png" alt="" className={s.logoMark} />
            <span className={s.logoMeta}>
              <span className={`mono ${s.logoName}`}>PMSB</span>
              <span className={`mono ${s.logoSub}`}>Bâtiment · Île-de-France</span>
            </span>
          </Link>

          <nav className={s.deskNav} aria-label="Navigation principale">
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mono swipe-link ${s.deskLink}`}
                data-active={pathname === item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={s.actions}>
            <a href={company.phoneHref} className={`mono ${s.phone}`}>
              {company.phone}
            </a>

            <Magnetic strength={0.22} radius={40}>
              <button
                type="button"
                className={s.burger}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-plein-ecran"
              >
                <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
                <span className={s.burgerLines} data-open={open}>
                  <i />
                  <i />
                </span>
                <span className={`mono ${s.burgerLabel}`}>{open ? "Fermer" : "Menu"}</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* ── Menu plein écran ── */}
      <div
        id="menu-plein-ecran"
        className={s.overlay}
        data-open={open}
        aria-hidden={!open}
      >
        <div className={s.panels}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ transitionDelay: `${i * 55}ms` }} />
          ))}
        </div>

        <div className={s.overlayInner}>
          <ul className={s.menuList}>
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={s.menuItem}
                style={{ transitionDelay: `${220 + i * 70}ms` }}
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link href={item.href} className={s.menuLink} tabIndex={open ? 0 : -1}>
                  <span className={`mono ${s.menuIndex}`}>{item.index}</span>
                  <span className={`display ${s.menuLabel}`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.overlayFoot}>
            <div className={s.overlayCol} style={{ transitionDelay: "520ms" }}>
              <span className={`mono ${s.overlayTag}`}>Sur la page d&apos;accueil</span>
              <div className={s.anchorList}>
                {homeAnchors.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={`mono swipe-link ${s.anchor}`}
                    tabIndex={open ? 0 : -1}
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={s.overlayCol} style={{ transitionDelay: "580ms" }}>
              <span className={`mono ${s.overlayTag}`}>Contact</span>
              <a href={company.phoneHref} className={`${s.overlayBig} swipe-link`}>
                {company.phone}
              </a>
              <a href={company.emailHref} className={`${s.overlayBig} swipe-link`}>
                {company.email}
              </a>
              <span className={`mono ${s.overlayAddr}`}>{company.address}</span>
            </div>
          </div>
        </div>

        <div className={s.follower} ref={followerRef} aria-hidden="true">
          <div className={s.followerInner} data-show={!!hovered}>
            {hovered && <img src={preview[hovered]} alt="" />}
          </div>
        </div>
      </div>
    </>
  );
}
