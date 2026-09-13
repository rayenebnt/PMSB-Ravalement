"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fullscreenQuad, mountScene, webglAvailable } from "@/lib/webgl";
import s from "./GridField.module.css";

/* ══════════════════════════════════════════════════════════════
   Trame d'implantation : un sol quadrillé en perspective qui file
   vers l'horizon, tracé entièrement dans le fragment shader.
   Sert de fond aux chapitres sombres — un plan de chantier vivant.
   ══════════════════════════════════════════════════════════════ */

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  uRes;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3  uLine;
  uniform vec3  uAccent;

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

    // Rayon depuis une caméra légèrement plongeante
    vec3 rd = normalize(vec3(uv.x, uv.y - 0.16, -1.0));

    vec3 col = vec3(0.0);

    if (rd.y < -0.0008) {
      float t = -1.0 / rd.y;                 // intersection du sol y = -1
      vec3 p = rd * t;
      p.z += uTime * 1.15 + uScroll * 26.0;  // la trame avance, et défile

      // Ondulation lente : le sol respire
      p.x += sin(p.z * 0.12 + uTime * 0.3) * 0.35;

      vec2 cell = p.xz * 0.42;
      vec2 f = abs(fract(cell) - 0.5);
      float d = min(f.x, f.y);

      float w = 0.012 + t * 0.0022;
      float line = smoothstep(w, 0.0, d);

      // Nœuds de trame plus marqués
      float node = smoothstep(w * 2.2, 0.0, max(f.x, f.y));

      float fade = exp(-t * 0.034);
      col += uLine * line * fade * 1.5;
      col += uAccent * node * fade * 0.75;
    }

    // Lueur d'horizon
    float horizon = exp(-abs(uv.y - 0.16) * 26.0);
    col += uAccent * horizon * 0.07;

    float alpha = clamp(max(max(col.r, col.g), col.b) * 2.4, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export default function GridField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webglAvailable()) return;

    return mountScene(
      canvas,
      ({ renderer, width, height }) => {
        const dpr = renderer.getPixelRatio();
        const uniforms = {
          uRes: { value: new THREE.Vector2(width * dpr, height * dpr) },
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uLine: { value: new THREE.Color("#a9ad93") },
          uAccent: { value: new THREE.Color("#d6ff3d") },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          transparent: true,
          depthTest: false,
        });

        const { scene, camera, geometry } = fullscreenQuad(material);

        return {
          resize(w, h) {
            uniforms.uRes.value.set(w * dpr, h * dpr);
          },
          frame(t, dt, p) {
            uniforms.uTime.value = t;
            uniforms.uScroll.value = p;
            renderer.render(scene, camera);
          },
          dispose() {
            geometry.dispose();
            material.dispose();
          },
        };
      },
      { dprMax: 1.35 }
    );
  }, []);

  return (
    <div className={`${s.field} ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
