import type { ReactNode } from "react";
import Link from "next/link";
import SplitText from "../system/SplitText";
import s from "./PageHero.module.css";

interface Props {
  index: string;
  tag: string;
  title: string;
  paragraphs: string[];
  backdrop?: ReactNode;
  /** Repères affichés en bas de la couverture. */
  markers?: string[];
  /** Titre plus long : on réduit le corps pour qu'il tienne. */
  compact?: boolean;
  /** Étape intermédiaire du fil d'ariane. */
  parent?: { label: string; href: string };
}

export default function PageHero({
  index,
  tag,
  title,
  paragraphs,
  backdrop,
  markers = [],
  compact = false,
  parent,
}: Props) {
  return (
    <section className={`on-dark ${s.hero}`} data-compact={compact}>
      {backdrop && <div className={s.backdrop}>{backdrop}</div>}
      <div className={s.veil} aria-hidden="true" />

      <div className={`shell ${s.inner}`}>
        <div className={s.crumb}>
          <Link href="/" className={`mono swipe-link ${s.crumbLink}`}>
            Accueil
          </Link>
          <span className={`mono ${s.crumbSep}`}>/</span>
          {parent && (
            <>
              <Link
                href={parent.href}
                className={`mono swipe-link ${s.crumbLink}`}
              >
                {parent.label}
              </Link>
              <span className={`mono ${s.crumbSep}`}>/</span>
            </>
          )}
          <span className={`mono ${s.crumbCurrent}`}>{tag}</span>
        </div>

        <div className={s.titleRow}>
          <span className={`mono ${s.index}`}>[ {index} ]</span>
          <SplitText
            as="h1"
            text={title}
            className={`display ${s.title}`}
            stagger={60}
            delay={120}
          />
        </div>

        <div className={s.body}>
          <div className={s.paragraphs}>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`lede ${s.para}`}
                data-reveal="up"
                data-reveal-delay={220 + i * 110}
              >
                {text}
              </p>
            ))}
          </div>

          {markers.length > 0 && (
            <ul className={s.markers} data-reveal="up" data-reveal-delay="420">
              {markers.map((m) => (
                <li key={m} className="mono">
                  <i />
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div data-header-sentinel className={s.sentinel} aria-hidden="true" />
    </section>
  );
}
