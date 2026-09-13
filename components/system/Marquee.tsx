import s from "./Marquee.module.css";

interface Props {
  items: string[];
  speed?: number;
  reverse?: boolean;
  outline?: boolean;
}

/** Bandeau défilant continu, façon signalétique de chantier. */
export default function Marquee({
  items,
  speed = 34,
  reverse = false,
  outline = false,
}: Props) {
  const run = [...items, ...items, ...items];

  return (
    <div className={s.band} data-outline={outline}>
      <div
        className={s.track}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div className={s.group} key={copy} aria-hidden={copy === 1}>
            {run.map((item, i) => (
              <span className={s.item} key={`${copy}-${i}`}>
                {item}
                <i className={s.dot} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
