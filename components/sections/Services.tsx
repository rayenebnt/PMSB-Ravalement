"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { services, servicesIntro } from "@/lib/site";
import SectionHead from "../system/SectionHead";
import s from "./Services.module.css";

type Service = (typeof services)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((r.height / 2 - (e.clientY - r.top)) / (r.height / 2)) * 3.2;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 3.6;
    el.style.transition = "transform 0.15s linear";
    el.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform 0.9s var(--ease)";
    el.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
  };

  const inner = (
    <div ref={tiltRef} className={s.tilt}>
      <div className={s.body}>
        <div className={s.bodyTop}>
          <span className={`mono ${s.number}`}>{service.number}</span>
          <span className={s.line} />
        </div>

        <h3 className={`display ${s.title}`}>{service.title}</h3>

        <p className={`body-text ${s.desc}`}>{service.description}</p>

        {service.href ? (
          <span className={`mono ${s.link}`}>
            En savoir plus <span className="btn-arrow">→</span>
          </span>
        ) : (
          <span className={`mono ${s.linkMuted}`}>Sur devis</span>
        )}
      </div>

      <div className={`frame ${s.media}`}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 880px) 100vw, 50vw"
          quality={82}
        />
        <span className={s.mediaGrid} aria-hidden="true" />
      </div>
    </div>
  );

  return (
    <article
      className={s.card}
      style={{
        top: `calc(var(--header-h) + ${18 + index * 16}px)`,
        zIndex: index + 1,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-reveal="up"
    >
      {service.href ? (
        <Link href={service.href} className={s.cardLink} data-cursor="Découvrir">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </article>
  );
}

export default function Services() {
  return (
    <section className={`section ${s.section}`} id="services">
      <div className="shell">
        <SectionHead
          index="01"
          tag="Ce que nous faisons"
          title="Nos services"
          lede={servicesIntro}
        />
      </div>

      <div className={`shell ${s.stack}`}>
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
