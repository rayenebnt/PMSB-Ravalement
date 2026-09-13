"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";
import { markReady } from "./siteReady";
import s from "./Preloader.module.css";

const COLUMNS = 6;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      markReady();
      setDone(true);
      return;
    }

    document.body.classList.add("no-scroll");
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Progression saccadée : le chantier avance par paliers
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        window.setTimeout(() => {
          markReady();
          document.body.classList.remove("no-scroll");
        }, 480);
        window.setTimeout(() => setDone(true), 1500);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  if (done) return null;

  return (
    <div className={s.root} data-leaving={leaving} aria-hidden="true">
      <div className={s.curtain}>
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <span
            key={i}
            className={s.column}
            style={{ transitionDelay: `${i * 65}ms` }}
          />
        ))}
      </div>

      <div className={s.content}>
        <div className={s.brandRow}>
          <span className={`display ${s.brand}`}>PMSB</span>
          <span className={`mono ${s.sub}`}>Prestations Multi Services Bâtiment</span>
        </div>

        <div className={s.meter}>
          <span className={s.track}>
            <span className={s.fill} style={{ transform: `scaleX(${count / 100})` }} />
          </span>
          <span className={`mono ${s.count}`}>{String(count).padStart(3, "0")}</span>
        </div>
      </div>
    </div>
  );
}
