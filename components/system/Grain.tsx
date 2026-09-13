"use client";

import { useEffect, useState } from "react";
import s from "./Grain.module.css";

/**
 * Voile de grain argentique. La tuile de bruit est générée une seule
 * fois côté client puis déplacée par une animation CSS en paliers :
 * coût nul en continu, texture vivante sur toute la page.
 */
export default function Grain() {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const size = 140;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = ctx.createImageData(size, size);
    const data = image.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = 120 + Math.random() * 135;
      data[i] = data[i + 1] = data[i + 2] = v;
      data[i + 3] = Math.random() * 34;
    }
    ctx.putImageData(image, 0, 0);
    setUrl(canvas.toDataURL("image/png"));
  }, []);

  if (!url) return null;

  return (
    <div
      className={s.grain}
      aria-hidden="true"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}
