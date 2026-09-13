"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { company } from "@/lib/site";
import Magnetic from "../system/Magnetic";
import s from "./Hero.module.css";

const StoneWall = dynamic(() => import("../webgl/StoneWall"), { ssr: false });

const metiers = ["Ravalement", "Isolation", "Étanchéité", "Rénovation"];

export default function Hero() {
  return (
    <section className={`on-dark ${s.hero}`} aria-label="Présentation">
      <StoneWall />

      <div className={`shell ${s.inner}`}>
        <p className={`mono tag ${s.eyebrow}`}>{company.tagline}</p>

        <h1 className={`display ${s.title}`} aria-label={company.name}>
          {company.name.split("").map((letter, i) => (
            <span key={i} className={s.letterMask}>
              <span className={s.letter} style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
                {letter}
              </span>
            </span>
          ))}
        </h1>

        <div className={s.bottom}>
          <p className={`lede ${s.lede}`}>
            {company.legalName} — nous redonnons leur tenue aux façades
            d&apos;Île-de-France&nbsp;: pierre de taille, brique, plâtre,
            isolation par l&apos;extérieur et étanchéité.
          </p>

          <div className={s.actions}>
            <Magnetic strength={0.25} radius={60}>
              <Link href="#contact" className={`btn btn-solid ${s.cta}`}>
                Nous contacter
                <span className="btn-arrow">→</span>
              </Link>
            </Magnetic>

            <Link href="#realisations" className={`btn btn-ghost ${s.cta}`}>
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </div>

      <div className={s.rail}>
        <div className={s.scrollCue} aria-hidden="true">
          <span className={s.scrollTrack}>
            <span className={s.scrollDot} />
          </span>
          <span className="mono">Défiler</span>
        </div>

        <ul className={s.metiers}>
          {metiers.map((m, i) => (
            <li key={m} className="mono" style={{ animationDelay: `${0.9 + i * 0.09}s` }}>
              <i />
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div data-header-sentinel className={s.sentinel} aria-hidden="true" />
    </section>
  );
}
