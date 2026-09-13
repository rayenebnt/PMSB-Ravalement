"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ravalement } from "@/lib/site";
import SectionHead from "../system/SectionHead";
import s from "./Expertises.module.css";

const MaterialCanvas = dynamic(() => import("../webgl/MaterialCanvas"), {
  ssr: false,
});

export default function Expertises() {
  return (
    <section className={`section ${s.section}`} id="expertises">
      <div className="shell">
        <SectionHead
          index="01"
          tag="Savoir-faire"
          title={ravalement.sectionTitle}
          lede={ravalement.sectionText}
        />

        <div className={s.rows}>
          {ravalement.expertises.map((item, i) => (
            <article
              key={item.title}
              className={s.row}
              data-flip={i % 2 === 1}
              data-reveal="up"
            >
              {/* Échantillon de matière calculé en temps réel */}
              <div className={s.matter}>
                <div className={s.matterInner}>
                  <MaterialCanvas
                    variant={item.variant}
                    label="Échantillon procédural"
                  />
                </div>
                <span className={`mono ${s.matterHint}`}>
                  Survolez pour incliner le bloc
                </span>
              </div>

              {/* Texte et vue de chantier */}
              <div className={s.content}>
                <div className={s.head}>
                  <span className={`mono ${s.number}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={s.rule} />
                </div>

                <h3 className={`display ${s.title}`}>{item.title}</h3>
                <p className={`body-text ${s.desc}`}>{item.description}</p>

                <div className={`frame ${s.photo}`} data-reveal="clip">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 920px) 100vw, 55vw"
                    quality={82}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
