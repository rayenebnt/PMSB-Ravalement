import s from "./SplitText.module.css";

interface Props {
  text: string;
  /** Décalage entre chaque mot, en ms. */
  stagger?: number;
  /** Décalage initial, en ms. */
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * Découpe un texte en mots masqués qui remontent l'un après l'autre.
 * Rendu côté serveur : aucune mesure DOM, aucun saut de mise en page.
 */
export default function SplitText({
  text,
  stagger = 42,
  delay = 0,
  className = "",
  as: Tag = "span",
}: Props) {
  const words = text.split(" ");

  return (
    <Tag className={className} data-reveal="fade">
      <span className={s.sr}>{text}</span>
      <span aria-hidden="true" className={s.wrap}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={s.mask}>
            <span
              className={s.word}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
