"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { isolation } from "@/lib/site";
import SectionHead from "../system/SectionHead";
import s from "./InsulationDemo.module.css";

const ThermalWall = dynamic(() => import("../webgl/ThermalWall"), { ssr: false });

const layers = [
  { name: "Mur porteur", note: "Support existant" },
  { name: "Isolant", note: "Laine de roche, polystyrène ou graphité" },
  { name: "Enduit de finition", note: "Protection et aspect" },
];

export default function InsulationDemo() {
  const [insulated, setInsulated] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  /* Démonstration jouée une fois, à l'entrée dans le viewport */
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();
        window.setTimeout(() => setInsulated(true), 1400);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`on-dark section ${s.section}`} id="pourquoi-isoler">
      <div className="shell">
        <SectionHead
          index="02"
          tag="Démonstration"
          title="La chaleur ne sort plus par les murs"
          lede="Coupe d'un mur isolé par l'extérieur. Posez le complexe isolant et observez les déperditions s'arrêter."
        />

        <div className={s.demo} ref={hostRef}>
          <div className={s.viewport}>
            <ThermalWall insulated={insulated} />
          </div>

          <div className={s.panel}>
            <div className={s.toggle} role="group" aria-label="État du mur">
              <button
                type="button"
                onClick={() => setInsulated(false)}
                data-active={!insulated}
                className={`mono ${s.toggleBtn}`}
              >
                Mur nu
              </button>
              <button
                type="button"
                onClick={() => setInsulated(true)}
                data-active={insulated}
                className={`mono ${s.toggleBtn}`}
              >
                Isolé par l&apos;extérieur
              </button>
            </div>

            <ol className={s.layers}>
              {layers.map((layer, i) => (
                <li key={layer.name} data-on={insulated || i === 0}>
                  <span className={`mono ${s.layerIndex}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={s.layerBody}>
                    <strong>{layer.name}</strong>
                    <span className={`mono ${s.layerNote}`}>{layer.note}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className={`body-text ${s.readout}`}>
              {insulated
                ? "Le complexe isolant est posé : les déperditions sont freinées et la température intérieure reste stable."
                : "Mur nu : la chaleur traverse la maçonnerie et se perd à l'extérieur."}
            </p>

            <div className={s.legend}>
              <span className="mono">
                <i data-tone="hot" /> Chaleur perdue
              </span>
              <span className="mono">
                <i data-tone="cold" /> Chaleur retenue
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Les six raisons d'isoler par l'extérieur ── */}
      <div className={`shell ${s.benefitsWrap}`}>
        <h3 className={`display ${s.benefitsTitle}`}>
          {isolation.benefitsTitle}
        </h3>

        <ol className={s.benefits}>
          {isolation.benefits.map((benefit, i) => (
            <li
              key={benefit.number}
              className={s.benefit}
              data-reveal="up"
              data-reveal-delay={(i % 3) * 110}
            >
              <span className={`display ${s.benefitNum}`}>{benefit.number}</span>
              <h4 className={`display ${s.benefitTitle}`}>{benefit.title}</h4>
              <p className={`body-text ${s.benefitText}`}>{benefit.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
