import SplitText from "./SplitText";
import s from "./SectionHead.module.css";

interface Props {
  index?: string;
  tag: string;
  title: string;
  lede?: string;
  align?: "left" | "split";
  id?: string;
}

/** En-tête de section : repère chiffré, étiquette, titre massif, chapô. */
export default function SectionHead({
  index,
  tag,
  title,
  lede,
  align = "split",
  id,
}: Props) {
  return (
    <header className={s.head} data-align={align} id={id}>
      <div className={s.meta}>
        {index && <span className={`mono ${s.index}`}>[ {index} ]</span>}
        <span className={`mono tag ${s.tag}`}>{tag}</span>
      </div>

      <div className={s.main}>
        <SplitText as="h2" text={title} className={`display h-lg ${s.title}`} />
        {lede && (
          <p className={`body-text ${s.lede}`} data-reveal="up" data-reveal-delay="140">
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}
