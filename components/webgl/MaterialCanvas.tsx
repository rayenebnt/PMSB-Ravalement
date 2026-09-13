"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fullscreenQuad, mountScene, webglAvailable } from "@/lib/webgl";
import s from "./MaterialCanvas.module.css";

/* ══════════════════════════════════════════════════════════════
   Échantillon de matière.

   Un bloc aux arêtes adoucies est tracé par lancer de rayons dans
   le fragment shader ; sa matière est entièrement procédurale —
   pierre de taille, brique, plâtre ou complexe d'imperméabilité.
   Aucune texture n'est chargée : tout est calculé sur le GPU.
   ══════════════════════════════════════════════════════════════ */

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  uRes;
  uniform float uTime;
  uniform float uVariant;
  uniform vec2  uPointer;
  uniform float uHover;

  const float PI = 3.14159265;

  /* ── Bruit ─────────────────────────────────────────────── */

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  float fbm(vec3 p) {
    float a = 0.5;
    float sum = 0.0;
    for (int i = 0; i < 5; i++) {
      sum += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return sum;
  }

  /* ── Volume ────────────────────────────────────────────── */

  float sdRoundBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
  }

  mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
  }

  mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);
  }

  mat3 gRot;

  float map(vec3 p) {
    return sdRoundBox(gRot * p, vec3(0.78, 0.78, 0.78), 0.055);
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0012, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)));
  }

  /* ── Relief de surface, propre à chaque matière ─────────── */

  float height(vec3 q) {
    if (uVariant < 0.5) {
      // Pierre de taille : grain minéral, pores, traces de layure
      float grain = fbm(q * 7.0);
      float pores = pow(noise(q * 34.0), 6.0) * 1.6;
      float chisel = sin(q.y * 62.0 + fbm(q * 5.0) * 5.0) * 0.05;
      return grain * 0.5 - pores + chisel;
    } else if (uVariant < 1.5) {
      // Brique : appareil à joints creux, assises décalées
      float row = floor(q.y * 5.2);
      float off = mod(row, 2.0) * 0.5;
      vec2 cell = vec2(fract(q.x * 2.6 + off), fract(q.y * 5.2));
      float joint = min(
        smoothstep(0.0, 0.028, cell.x) * smoothstep(1.0, 0.972, cell.x),
        smoothstep(0.0, 0.055, cell.y) * smoothstep(1.0, 0.945, cell.y));
      // Arêtes émoussées et parement irrégulier
      float wear = fbm(vec3(cell * 6.0, row) * 1.8) * 0.2;
      return joint * (0.78 + wear) + fbm(q * 28.0) * 0.13;
    } else if (uVariant < 2.5) {
      // Plâtre : lissé à la taloche, quelques reprises
      float sweep = fbm(q * 2.2 + vec3(0.0, 0.0, uTime * 0.02));
      return sweep * 0.34 + fbm(q * 16.0) * 0.055;
    }
    // Imperméabilisation : film tendu, l'eau perle en surface
    float base = fbm(q * 9.0) * 0.1;
    vec3 c = floor(q * 13.0);
    float r = hash(c);
    vec3 centre = (c + 0.5 + (vec3(hash(c + 1.0), hash(c + 2.0), hash(c + 3.0)) - 0.5) * 0.6) / 13.0;
    float bead = smoothstep(0.055 * (0.4 + r), 0.0, length(q - centre)) * step(0.55, r);
    return base + bead * 0.9;
  }

  vec3 albedo(vec3 q, float h) {
    if (uVariant < 0.5) {
      vec3 warm = vec3(0.90, 0.84, 0.70);
      vec3 cool = vec3(0.72, 0.66, 0.55);
      return mix(cool, warm, clamp(h * 1.5, 0.0, 1.0));
    } else if (uVariant < 1.5) {
      vec3 mortar = vec3(0.54, 0.51, 0.46);
      // Chaque brique tire sur une teinte propre, et s'use
      float row = floor(q.y * 5.2);
      float col = floor(q.x * 2.6 + mod(row, 2.0) * 0.5);
      float tint = hash(vec3(col, row, 3.1));
      vec3 brick = mix(vec3(0.42, 0.18, 0.13), vec3(0.66, 0.33, 0.20), tint);
      brick *= 0.82 + fbm(q * 15.0) * 0.42;
      return mix(mortar, brick, smoothstep(0.46, 0.66, h));
    } else if (uVariant < 2.5) {
      return mix(vec3(0.87, 0.86, 0.83), vec3(0.95, 0.94, 0.91),
                 clamp(h * 2.2, 0.0, 1.0));
    }
    vec3 film = vec3(0.13, 0.14, 0.16);
    vec3 water = vec3(0.52, 0.68, 0.74);
    return mix(film, water, smoothstep(0.25, 0.7, h));
  }

  float roughnessOf(float h) {
    if (uVariant < 0.5) return 0.82;
    if (uVariant < 1.5) return 0.76;
    if (uVariant < 2.5) return 0.6;
    return mix(0.42, 0.08, smoothstep(0.25, 0.7, h));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);

    // Le bloc tourne lentement, le curseur l'incline
    float spin = uTime * 0.22 + uPointer.x * 0.6;
    float tilt = -0.28 + uPointer.y * 0.32;
    gRot = rotX(tilt) * rotY(spin);

    vec3 ro = vec3(0.0, 0.0, 3.2);
    vec3 rd = normalize(vec3(uv * 1.15, -1.6));

    float t = 0.0;
    float hit = 0.0;
    for (int i = 0; i < 78; i++) {
      vec3 p = ro + rd * t;
      float d = map(p);
      if (d < 0.0009) { hit = 1.0; break; }
      t += d;
      if (t > 7.0) break;
    }

    if (hit < 0.5) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);

    // Coordonnées liées au bloc : la matière tourne avec lui
    vec3 q = gRot * p;

    float h = height(q);

    // Perturbation de la normale par différences finies
    float e = 0.006;
    vec3 g = vec3(
      height(q + vec3(e, 0.0, 0.0)) - height(q - vec3(e, 0.0, 0.0)),
      height(q + vec3(0.0, e, 0.0)) - height(q - vec3(0.0, e, 0.0)),
      height(q + vec3(0.0, 0.0, e)) - height(q - vec3(0.0, 0.0, e))) / (2.0 * e);

    vec3 gw = transpose(gRot) * g;
    gw = gw - n * dot(n, gw);
    float bump = (uVariant > 2.5) ? 0.0085 : 0.016;
    n = normalize(n - gw * bump);

    vec3 base = albedo(q, h);
    float rough = roughnessOf(h);

    vec3 L = normalize(vec3(-0.5, 0.8, 0.7));
    vec3 V = -rd;
    vec3 H = normalize(L + V);

    float diff = max(dot(n, L), 0.0);
    float spec = pow(max(dot(n, H), 0.0), mix(6.0, 180.0, 1.0 - rough))
               * (1.0 - rough) * 1.5;
    float rim = pow(1.0 - max(dot(n, V), 0.0), 3.2);

    // Rebond chaud du sol, ciel plus neutre au zénith
    vec3 sky = mix(vec3(0.30, 0.23, 0.16), vec3(0.66, 0.67, 0.7),
                   n.y * 0.5 + 0.5);

    vec3 col = base * (0.26 + diff * 1.05) + base * sky * 0.42;
    col += vec3(1.0, 0.97, 0.9) * spec * (0.6 + uHover * 0.7);
    col += vec3(0.84, 1.0, 0.24) * rim * 0.1;

    // Occlusion douce dans les creux
    col *= 0.74 + clamp(h, 0.0, 1.0) * 0.32;

    col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface Props {
  variant: number;
  className?: string;
  label?: string;
}

export default function MaterialCanvas({ variant, className, label }: Props) {
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
          uVariant: { value: variant },
          uPointer: { value: new THREE.Vector2() },
          uHover: { value: 0 },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          transparent: true,
        });

        const { scene, camera, geometry } = fullscreenQuad(material);

        const host = canvas.parentElement as HTMLElement;
        let hover = 0;
        const onEnter = () => (hover = 1);
        const onLeave = () => (hover = 0);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);

        return {
          resize(w, h) {
            uniforms.uRes.value.set(w * dpr, h * dpr);
          },
          frame(t, dt, p, pointer) {
            uniforms.uTime.value = t;
            uniforms.uPointer.value.copy(pointer);
            uniforms.uHover.value +=
              (hover - uniforms.uHover.value) * (1 - Math.exp(-6 * dt));
            renderer.render(scene, camera);
          },
          dispose() {
            host.removeEventListener("pointerenter", onEnter);
            host.removeEventListener("pointerleave", onLeave);
            geometry.dispose();
            material.dispose();
          },
        };
      },
      { dprMax: 1.5 }
    );
  }, [variant]);

  return (
    <div className={`${s.sample} ${className ?? ""}`}>
      <canvas ref={canvasRef} />
      {label && <span className={`mono ${s.label}`}>{label}</span>}
    </div>
  );
}
