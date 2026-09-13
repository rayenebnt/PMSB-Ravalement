"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fullscreenQuad, mountScene, webglAvailable } from "@/lib/webgl";
import s from "./ThermalFacade.module.css";

/* ══════════════════════════════════════════════════════════════
   Thermographie de façade.

   Une caméra thermique regarde un immeuble : les ponts thermiques
   — nez de dalle, tableaux de fenêtres — chauffent en rouge.
   Là où passe le curseur, le mur est isolé et redescend au bleu.
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
  uniform vec2  uPointer;
  uniform float uActive;

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
      p *= 2.05;
      a *= 0.5;
    }
    return v;
  }

  // Distance signée à un rectangle
  float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  }

  // Palette de caméra thermique
  vec3 thermal(float t) {
    t = clamp(t, 0.0, 1.0);
    vec3 c = mix(vec3(0.03, 0.05, 0.14), vec3(0.16, 0.10, 0.42), smoothstep(0.0, 0.28, t));
    c = mix(c, vec3(0.62, 0.13, 0.36), smoothstep(0.26, 0.5, t));
    c = mix(c, vec3(0.90, 0.34, 0.10), smoothstep(0.48, 0.7, t));
    c = mix(c, vec3(0.99, 0.76, 0.16), smoothstep(0.68, 0.88, t));
    c = mix(c, vec3(1.0, 0.98, 0.86), smoothstep(0.86, 1.0, t));
    return c;
  }

  void main() {
    vec2 res = uRes;
    vec2 uv = gl_FragCoord.xy / res;
    float aspect = res.x / res.y;

    // Trame de façade : travées et niveaux
    vec2 g = vec2(uv.x * aspect * 3.1, uv.y * 4.0) + vec2(0.0, uTime * 0.012);
    vec2 cell = fract(g) - 0.5;

    // Baie dans chaque travée
    float win = sdBox(cell + vec2(0.0, 0.04), vec2(0.115, 0.235));

    // Ponts thermiques : encadrement de baie et nez de dalle
    float frame = exp(-abs(win) * 26.0);
    float slab = exp(-abs(fract(g.y) - 0.04) * 16.0);
    float corner = exp(-abs(abs(cell.x) - 0.5) * 22.0) * 0.5;

    // Fuite diffuse du mur, irrégulière
    float leak = fbm(g * 2.4 + uTime * 0.05) * 0.42;

    float heat = (frame * 0.8 + slab * 0.6 + corner * 0.8 + leak * 0.85) * 0.88;

    // Vitrage : froid vu de l'extérieur
    heat = mix(heat, 0.12 + leak * 0.2, smoothstep(0.006, -0.01, win));

    // Le curseur applique l'isolant : le mur redescend en température
    vec2 pp = (uPointer * 0.5 + 0.5);
    float d = distance(vec2(uv.x * aspect, uv.y), vec2(pp.x * aspect, pp.y));
    float insulated = smoothstep(0.34, 0.04, d) * uActive;
    heat = mix(heat, heat * 0.1, insulated);

    vec3 col = thermal(heat);

    // Liseré vif sur la limite de l'isolant posé
    float edge = smoothstep(0.1, 0.45, insulated) * (1.0 - smoothstep(0.45, 0.8, insulated));
    col += vec3(0.84, 1.0, 0.24) * edge * 0.5;

    // Grain et lignes de balayage de la caméra
    col *= 0.88 + 0.12 * noise(gl_FragCoord.xy * 0.9 + uTime * 40.0);
    col *= 0.94 + 0.06 * sin(gl_FragCoord.y * 1.6 + uTime * 2.2);

    // La couverture reste un fond : le titre doit primer
    col *= 0.72;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ThermalFacade({ className }: { className?: string }) {
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
          uPointer: { value: new THREE.Vector2(0, 0) },
          uActive: { value: 0 },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
        });

        const { scene, camera, geometry } = fullscreenQuad(material);

        return {
          resize(w, h) {
            uniforms.uRes.value.set(w * dpr, h * dpr);
          },
          frame(t, dt, p, pointer) {
            uniforms.uTime.value = t;
            uniforms.uPointer.value.copy(pointer);

            // L'isolant n'apparaît qu'une fois le curseur entré en scène
            const moved = pointer.x !== 0 || pointer.y !== 0;
            uniforms.uActive.value +=
              ((moved ? 1 : 0) - uniforms.uActive.value) * (1 - Math.exp(-3 * dt));

            renderer.render(scene, camera);
          },
          dispose() {
            geometry.dispose();
            material.dispose();
          },
        };
      },
      { dprMax: 1.3, alpha: false }
    );
  }, []);

  return (
    <div className={`${s.field} ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
