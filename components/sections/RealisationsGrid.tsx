import Image from "next/image";
import SectionHead from "../system/SectionHead";
import BeforeAfter from "./BeforeAfter";
import { realisations, realisationsPage, type Realisation } from "@/lib/site";
import s from "./RealisationsGrid.module.css";

/* ══════════════════════════════════════════════════════════════
   Liste des chantiers.

   La grille compte deux colonnes. Un chantier photographié avant
   et après occupe la largeur entière — le comparateur a besoin de
   place. Un chantier resté seul en fin de ligne est élargi lui
   aussi, pour qu'aucune demi-ligne ne reste béante.
   ══════════════════════════════════════════════════════════════ */

interface Slot {
  item: Realisation;
  wide: boolean;
}

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
      slot.wide = true; // dernière fiche, seule sur sa ligne
      return;
    }
    column = column === 0 ? 1 : 0;
  });

  return slots;
}

function Card({ item, wide, position }: Slot & { position: number }) {
  const number = String(position + 1).padStart(2, "0");
  const sizes =
    item.fit === "contain"
      ? "(max-width: 700px) 100vw, 640px"
      : wide
      ? "(max-width: 1100px) 100vw, 1400px"
      : "(max-width: 900px) 100vw, 46vw";

  return (
    <article
      id={item.slug}
      className={s.card}
      data-wide={wide}
      data-fit={item.fit ?? "cover"}
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
            fit={item.fit}
          />
        ) : (
          <div className={`frame ${s.single}`}>
            <Image
              src={item.after}
              alt={`${item.title} — résultat des travaux`}
              fill
              sizes={sizes}
              quality={82}
              priority={position === 0}
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

export default function RealisationsGrid() {
  const slots = layout(realisations);
  const comparable = realisations.filter((r) => r.before).length;

  return (
    <section className={`section ${s.section}`} id="chantiers">
      <div className="shell">
        <SectionHead
          index="01"
          tag="Chantiers livrés"
          title="Nos réalisations"
          lede={realisationsPage.introParagraphs[0]}
        />

        {comparable > 0 && (
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
            {realisationsPage.hint}
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
