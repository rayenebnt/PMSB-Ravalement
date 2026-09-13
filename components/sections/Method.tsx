"use client";

import dynamic from "next/dynamic";
import { method } from "@/lib/site";
import SectionHead from "../system/SectionHead";
import s from "./Method.module.css";

const GridField = dynamic(() => import("../webgl/GridField"), { ssr: false });

export default function Method() {
  return (
    <section className={`on-dark section ${s.section}`} id="methode">
      <GridField />

      <div className={`shell ${s.inner}`}>
        <SectionHead
          index="02"
          tag="Notre méthode"
          title="Quatre temps, un chantier"
          lede="Du premier relevé à la finition, chaque étape est menée par une équipe formée à la technique concernée."
        />

        <ol className={s.steps}>
          {method.map((step, i) => (
            <li
              key={step.number}
              className={s.step}
              data-reveal="up"
              data-reveal-delay={i * 120}
            >
              <span className={`display ${s.number}`}>{step.number}</span>
              <span className={s.marker} aria-hidden="true">
                <i />
              </span>
              <h3 className={`display ${s.title}`}>{step.title}</h3>
              <p className={`body-text ${s.text}`}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
