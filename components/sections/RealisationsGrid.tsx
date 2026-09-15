import Image from "next/image";
import SectionHead from "../system/SectionHead";
import BeforeAfter from "./BeforeAfter";
import { realisations, realisationsPage, type Realisation } from "@/lib/site";
import s from "./RealisationsGrid.module.css";

/* ══════════════════════════════════════════════════════════════
   Les chantiers, en deux sections.

   Les avant / après d'abord : un comparateur occupe la largeur
   entière, il en a besoin. Les résultats seuls ensuite, sur deux
   colonnes. Le classement vient des données — un chantier bascule
   d'une section à l'autre le jour où sa photo d'avant arrive.
   ══════════════════════════════════════════════════════════════ */

interface Slot {
  item: Realisation;
  wide: boolean;
}

/**
 * Répartit les fiches sur deux colonnes. Une fiche restée seule en
 * fin de ligne est élargie, pour qu'aucune demi-ligne ne reste béante.
 */
function layout(items: Realisation[]): Slot[] {
  const slots: Slot[] = items.map((item) => ({
    item,
    wide: Boolean(item.before),
  }));

  let column = 0;
  slots.forEach((slot, i) => {
    if (slot.wide) {
      column = 0;
      return;
    }
    if (column === 0 && i === slots.length - 1) {
      slot.wide = true;
      return;
    }
    column = column === 0 ? 1 : 0;
  });

  return slots;
}

function Card({ item, wide, position }: Slot & { position: number }) {
  const number = String(position + 1).padStart(2, "0");
  const sizes = wide
    ? "(max-width: 1100px) 100vw, 1400px"
    : "(max-width: 900px) 100vw, 46vw";

  return (
    <article
      id={item.slug}
      className={s.card}
      data-wide={wide}
      data-reveal="up"
      data-reveal-delay={(position % 2) * 120}
    >
      <div className={s.media}>
        {item.before ? (
          <BeforeAfter
            before={item.before}
            after={item.after}
            subject={item.title}
            sizes={sizes}
            priority={position === 0}
          />
        ) : (
          <div className={`frame ${s.single}`}>
            <Image
              src={item.after}
              alt={`${item.title} — résultat des travaux`}
              fill
              sizes={sizes}
              quality={82}
            />
            <span className={`mono ${s.resultChip}`}>Résultat</span>
          </div>
        )}
      </div>

      <div className={s.info}>
        <div className={s.meta}>
          <span className={`mono ${s.number}`}>[ {number} ]</span>
          <span className={`mono ${s.category}`}>{item.category}</span>
          {item.place && <span className={`mono ${s.place}`}>{item.place}</span>}
          {item.before && (
            <span className={`mono ${s.compare}`}>Avant / Après</span>
          )}
        </div>

        <h3 className={`display ${s.title}`}>{item.title}</h3>
        <p className={`body-text ${s.desc}`}>{item.description}</p>
      </div>
    </article>
  );
}

interface GroupProps {
  id: string;
  index: string;
  tag: string;
  title: string;
  lede: string;
  hint?: string;
  items: Realisation[];
  tone?: "base" | "alt";
}

function Group({ id, index, tag, title, lede, hint, items, tone = "base" }: GroupProps) {
  const slots = layout(items);

  return (
    <section className={`section ${s.section}`} id={id} data-tone={tone}>
      <div className="shell">
        <SectionHead index={index} tag={tag} title={title} lede={lede} />

        {hint && (
          <p className={`mono ${s.hint}`} data-reveal="fade" data-reveal-delay="200">
            <span className={s.hintIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14">
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
            {hint}
          </p>
        )}

        <div className={s.grid}>
          {slots.map((slot, i) => (
            <Card
              key={slot.item.slug}
              item={slot.item}
              wide={slot.wide}
              position={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RealisationsGrid() {
  const { compare, results } = realisationsPage;
  const withBefore = realisations.filter((r) => r.before);
  const resultOnly = realisations.filter((r) => !r.before);

  return (
    <>
      {withBefore.length > 0 && (
        <Group
          id="avant-apres"
          index={compare.index}
          tag={compare.tag}
          title={compare.title}
          lede={compare.lede}
          hint={compare.hint}
          items={withBefore}
        />
      )}

      {resultOnly.length > 0 && (
        <Group
          id="resultats"
          index={results.index}
          tag={results.tag}
          title={results.title}
          lede={results.lede}
          items={resultOnly}
          tone="alt"
        />
      )}
    </>
  );
}
