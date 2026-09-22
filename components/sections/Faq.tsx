import type { FaqItem } from "@/lib/site";
import SectionHead from "../system/SectionHead";
import s from "./Faq.module.css";

interface Props {
  index: string;
  title?: string;
  lede?: string;
  items: FaqItem[];
  dark?: boolean;
  id?: string;
}

/**
 * Questions fréquentes.
 *
 * Bâtie sur `<details>` : le texte des réponses est présent dans le HTML
 * même replié, donc lisible par les robots comme par les lecteurs d'écran,
 * sans dépendre du JavaScript.
 */
export default function Faq({
  index,
  title = "Questions fréquentes",
  lede,
  items,
  dark = false,
  id = "faq",
}: Props) {
  if (items.length === 0) return null;

  return (
    <section className={`section ${s.section} ${dark ? "on-dark" : ""}`} id={id}>
      <div className="shell">
        <SectionHead index={index} tag="Bon à savoir" title={title} lede={lede} />

        <div className={s.list}>
          {items.map((item, i) => (
            <details
              key={item.question}
              className={s.item}
              data-reveal="up"
              data-reveal-delay={Math.min(i, 4) * 80}
            >
              <summary className={s.question}>
                <h3 className={s.questionText}>{item.question}</h3>
                <span className={s.sign} aria-hidden="true" />
              </summary>
              <div className={s.answer}>
                <p className="body-text">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
