import Image from "next/image";
import { rge } from "@/lib/site";
import SplitText from "../system/SplitText";
import s from "./RgeBlock.module.css";

export default function RgeBlock() {
  return (
    <section className={`on-dark section ${s.section}`} id="rge">
      <div className={`shell ${s.inner}`}>
        <div className={s.text}>
          <span className={`mono tag ${s.badge}`}>{rge.badge}</span>

          <SplitText
            as="h2"
            text={rge.title}
            className={`display h-lg ${s.title}`}
            stagger={50}
          />

          <p className={`lede ${s.desc}`} data-reveal="up" data-reveal-delay="120">
            {rge.descriptionLead}
            <strong>{rge.descriptionStrong}</strong>
            {rge.descriptionRest}
          </p>

          <ul className={s.list}>
            {rge.points.map((point, i) => (
              <li key={point} data-reveal="up" data-reveal-delay={180 + i * 100}>
                <span className={s.tick} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.logoCol} data-reveal="scale" data-reveal-delay="200">
          <div className={s.logoFrame}>
            <Image
              src={rge.logo}
              alt="Certification RGE"
              width={340}
              height={175}
              quality={90}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
            />
          </div>
          <span className={`mono ${s.logoNote}`}>
            Reconnu Garant de l&apos;Environnement
          </span>
        </div>
      </div>
    </section>
  );
}
