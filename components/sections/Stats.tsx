import { stats } from "@/lib/site";
import Counter from "../system/Counter";
import Marquee from "../system/Marquee";
import s from "./Stats.module.css";

export default function Stats() {
  return (
    <section className={s.section} aria-label="Chiffres clés">
      <Marquee
        items={["Ravalement", "Isolation thermique", "Étanchéité", "Rénovation"]}
        outline
        speed={42}
      />

      <div className={`shell ${s.inner}`}>
        <ul className={s.grid}>
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={s.item}
              data-reveal="up"
              data-reveal-delay={i * 110}
            >
              <span className={`display ${s.value}`}>
                {stat.value === null ? (
                  stat.text
                ) : (
                  <Counter to={stat.value} suffix={stat.suffix} />
                )}
              </span>
              <span className={`mono ${s.label}`}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
