"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fullscreenQuad, mountScene, webglAvailable } from "@/lib/webgl";
import s from "./WaterSurface.module.css";

/* ══════════════════════════════════════════════════════════════
   Surface étanche sous la pluie.

   Le complexe d'étanchéité est modélisé comme un film satiné :
   les gouttes tombent, l'onde se propage, et rien ne traverse.
   Le curseur fait lui aussi perler l'eau.
   ══════════════════════════════════════════════════════════════ */

const MAX_RIPPLES = 14;

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  uRes;
  uniform float uTime;
  uniform vec4  uRipples[${MAX_RIPPLES}]; // xy : centre · z : naissance · w : force
  uniform vec3  uMembrane;
  uniform vec3  uAccent;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float a = 0.5;
    float v = 0.0;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.07;
      a *= 0.5;
    }
    return v;
  }

  // Hauteur de la lame d'eau au point p
  float waterHeight(vec2 p) {
    float h = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      if (r.w <= 0.001) continue;

      float age = uTime - r.z;
      if (age < 0.0 || age > 2.6) continue;

      float d = distance(p, r.xy);

      // Anneau qui s'élargit et s'amortit
      float front = smoothstep(0.075, 0.0, abs(d - age * 0.145));
      float wave = sin(d * 96.0 - age * 15.0);
      float damp = exp(-d * 2.2) * exp(-age * 0.85);

      h += wave * front * damp * r.w;
    }

    // Ruissellement lent sur le support
    h += (fbm(p * 6.5 + vec2(0.0, uTime * 0.05)) - 0.5) * 0.045;
    return h;
  }

  void main() {
    vec2 res = uRes;
    float aspect = res.x / res.y;
    vec2 uv = gl_FragCoord.xy / res;
    vec2 p = vec2(uv.x * aspect, uv.y);

    float e = 1.6 / res.y;
    float h = waterHeight(p);
    float hx = waterHeight(p + vec2(e, 0.0));
    float hy = waterHeight(p + vec2(0.0, e));

    vec3 n = normalize(vec3((h - hx) / e * 0.05, (h - hy) / e * 0.05, 1.0));

    // Support : membrane satinée, grain de résine
    float grain = fbm(p * 90.0) * 0.1 + fbm(p * 14.0) * 0.1;
    vec3 base = uMembrane * (0.82 + grain);

    vec3 L = normalize(vec3(-0.42, 0.68, 0.6));
    vec3 V = vec3(0.0, 0.0, 1.0);
    vec3 H = normalize(L + V);

    float diff = max(dot(n, L), 0.0);
    float spec = pow(max(dot(n, H), 0.0), 64.0) * 1.5;
    float fres = pow(1.0 - max(dot(n, V), 0.0), 4.0);

    // Ciel réfléchi par la lame d'eau
    vec3 sky = mix(vec3(0.10, 0.14, 0.2), vec3(0.42, 0.52, 0.62),
                   clamp(n.y * 1.6 + 0.5, 0.0, 1.0));

    vec3 col = base * (0.46 + diff * 1.05);
    col += sky * (0.34 + fres * 1.0);
    col += vec3(1.0) * spec * 0.85;

    // Les crêtes d'onde attrapent l'accent
    col += uAccent * clamp(h, 0.0, 1.0) * 0.34;

    // Halo de lumière rasante
    float sweep = exp(-pow((uv.x + uv.y * 0.35 - fract(uTime * 0.05) * 1.8), 2.0) * 5.0);
    col += vec3(0.7, 0.82, 0.9) * sweep * 0.045;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function WaterSurface({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webglAvailable()) return;

    return mountScene(
      canvas,
      ({ renderer, width, height, reduced }) => {
        const dpr = renderer.getPixelRatio();

        const ripples: THREE.Vector4[] = Array.from(
          { length: MAX_RIPPLES },
          () => new THREE.Vector4(0, 0, -99, 0)
        );

        const uniforms = {
          uRes: { value: new THREE.Vector2(width * dpr, height * dpr) },
          uTime: { value: 0 },
          uRipples: { value: ripples },
          uMembrane: { value: new THREE.Color("#33403f") },
          uAccent: { value: new THREE.Color("#d6ff3d") },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
        });

        const { scene, camera, geometry } = fullscreenQuad(material);

        let slot = 0;
        const drop = (x: number, y: number, strength: number, time: number) => {
          ripples[slot].set(x, y, time, strength);
          slot = (slot + 1) % MAX_RIPPLES;
        };

        let nextDrop = 0.4;
        let lastPointerDrop = 0;

        return {
          resize(w, h) {
            uniforms.uRes.value.set(w * dpr, h * dpr);
          },
          frame(t, dt, p, pointer) {
            uniforms.uTime.value = t;

            const aspect = uniforms.uRes.value.x / uniforms.uRes.value.y;

            // Pluie : une goutte tombe à intervalle irrégulier
            if (!reduced && t > nextDrop) {
              drop(Math.random() * aspect, Math.random(), 0.85 + Math.random() * 0.55, t);
              nextDrop = t + 0.14 + Math.random() * 0.3;
            }

            // Le curseur fait perler l'eau à son passage
            const px = (pointer.x * 0.5 + 0.5) * aspect;
            const py = pointer.y * 0.5 + 0.5;
            if (!reduced && (pointer.x !== 0 || pointer.y !== 0) && t - lastPointerDrop > 0.055) {
              lastPointerDrop = t;
              drop(px, py, 0.65, t);
            }

            renderer.render(scene, camera);
          },
          dispose() {
            geometry.dispose();
            material.dispose();
          },
        };
      },
      { dprMax: 1.25, alpha: false }
    );
  }, []);

  return (
    <div className={`${s.field} ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
