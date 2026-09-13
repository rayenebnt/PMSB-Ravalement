"use client";

import Image from "next/image";
import { useRef } from "react";
import SectionHead from "../system/SectionHead";
import s from "./CardGrid.module.css";

export interface GridItem {
  image: string;
  title: string;
  description: string;
}

interface Props {
  id?: string;
  index: string;
  tag: string;
  title: string;
  lede?: string;
  items: GridItem[];
  dark?: boolean;
  columns?: 3 | 4;
}

function Card({ item, position }: { item: GridItem; position: number }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((r.height / 2 - (e.clientY - r.top)) / (r.height / 2)) * 4.5;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 5;
    el.style.transition = "transform 0.14s linear";
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.9s var(--ease)";
    el.style.transform = "perspective(1100px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <article
      ref={ref}
      className={s.card}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-reveal="up"
      data-reveal-delay={(position % 4) * 110}
    >
      <div className={`frame ${s.media}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
          quality={82}
        />
        <span className={`mono ${s.badge}`}>
          {String(position + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={s.body}>
        <h3 className={`display ${s.title}`}>{item.title}</h3>
        <p className={`body-text ${s.desc}`}>{item.description}</p>
      </div>
    </article>
  );
}

export default function CardGrid({
  id,
  index,
  tag,
  title,
  lede,
  items,
  dark = false,
  columns = 3,
}: Props) {
  return (
    <section
      className={`section ${s.section} ${dark ? "on-dark" : ""}`}
      id={id}
      data-columns={columns}
    >
      <div className="shell">
        <SectionHead index={index} tag={tag} title={title} lede={lede} />

        <div className={s.grid}>
          {items.map((item, i) => (
            <Card key={item.title} item={item} position={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
