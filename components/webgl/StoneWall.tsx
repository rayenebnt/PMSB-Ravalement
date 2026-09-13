"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mountScene, webglAvailable } from "@/lib/webgl";
import { clamp, makeRandom, mapRange } from "@/lib/utils";
import { useSiteReady } from "../system/siteReady";
import s from "./StoneWall.module.css";

/* ══════════════════════════════════════════════════════════════
   Façade en pierre de taille, instanciée.

   Chaque pierre est une instance pilotée par le vertex shader :
   l'appareil se monte assise par assise à l'arrivée, respire en
   permanence, puis se disperse au défilement.

   Le curseur, lui, ravale : la pierre encrassée redevient claire
   là où il passe, avec un front de nettoyage marqué.
   ══════════════════════════════════════════════════════════════ */

const vertexShader = /* glsl */ `
  attribute vec3  aPos;
  attribute vec3  aScale;
  attribute vec3  aOrigin;
  attribute vec3  aAxis;
  attribute vec2  aRnd;    // x : aléa · y : retard d'assemblage
  attribute float aTone;
  attribute float aKind;   // 0 : parement · 1 : bandeau saillant

  uniform float uTime;
  uniform float uProgress;
  uniform float uScroll;

  varying vec3  vNormal;
  varying vec3  vWorld;
  varying float vTone;
  varying float vKind;
  varying float vRnd;

  vec3 rotAxis(vec3 v, vec3 axis, float a) {
    float c = cos(a);
    float s = sin(a);
    return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);
  }

  void main() {
    // Assemblage échelonné : chaque pierre attend son tour
    float e = clamp((uProgress - aRnd.y * 0.52) / 0.48, 0.0, 1.0);
    e = 1.0 - pow(1.0 - e, 3.0);

    vec3 target = aPos;

    // Respiration : l'appareil n'est jamais tout à fait immobile
    float wave = sin(aPos.x * 0.34 + uTime * 0.42)
               * cos(aPos.y * 0.4 - uTime * 0.31);
    target.z += wave * 0.13 * e;

    // Dispersion au défilement
    vec3 blast = normalize(vec3(aPos.xy * 0.35, 1.0));
    target += blast * uScroll * (3.0 + aRnd.x * 7.0);

    vec3 p = mix(aOrigin, target, e);

    float angle = (1.0 - e) * 2.6 + uScroll * 3.2 * (aRnd.x - 0.5);

    vec3 local = rotAxis(position * aScale, aAxis, angle);
    vec3 n = normal / max(aScale, vec3(0.001));
    vNormal = normalize(rotAxis(n, aAxis, angle));

    vec3 world = local + p;
    vWorld = world;
    vTone  = aTone;
    vKind  = aKind;
    vRnd   = aRnd.x;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uLight;
  uniform vec3  uStone;   // pierre ravalée
  uniform vec3  uSoot;    // pierre encrassée
  uniform vec3  uAccent;
  uniform vec3  uFog;

  varying vec3  vNormal;
  varying vec3  vWorld;
  varying float vTone;
  varying float vKind;
  varying float vRnd;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = vec3(0.0, 0.0, 1.0);

    vec3 key  = normalize(vec3(-0.4, 0.82, 0.5));
    vec3 fill = normalize(vec3(0.78, -0.22, 0.36));

    float d1 = max(dot(N, key), 0.0);
    float d2 = max(dot(N, fill), 0.0);

    // Front de nettoyage : irrégulier, comme un vrai décapage
    float wobble = sin(vWorld.y * 1.7 + vRnd * 6.2) * 0.9
                 + sin(vWorld.x * 1.1 - vRnd * 3.1) * 0.6;
    float dl = distance(vWorld.xy, uLight) + wobble;
    float clean = smoothstep(9.5, 2.2, dl);

    vec3 dirty = uSoot * (0.62 + vTone * 0.38);
    vec3 fresh = uStone * (0.66 + vTone * 0.34);
    vec3 albedo = mix(dirty, fresh, clean);

    // Le bandeau saillant accroche davantage la lumière
    float band = 1.0 + vKind * 0.22;

    vec3 col = albedo * (0.125 + d1 * (0.6 + clean * 0.56)) * band;
    col += vec3(0.078, 0.094, 0.14) * d2 * 0.5;

    // Liseré vif sur le front, là où la pierre vient d'être dégagée
    float edge = smoothstep(0.34, 0.5, clean) * (1.0 - smoothstep(0.5, 0.68, clean));
    col += uAccent * edge * 0.055;

    // Liseré de silhouette
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.5);
    col += fres * 0.075;

    // Profondeur puis effacement au défilement
    float fog = 1.0 - smoothstep(-26.0, 3.0, vWorld.z);
    col = mix(col, uFog, fog * 0.95);
    col = mix(col, uFog, uScroll * 0.42);

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface WallBlock {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  tone: number;
  kind: number;
}

/**
 * Appareil à assises décalées : les pierres n'ont pas toutes la même
 * longueur, deux bandeaux filent en saillie, la profondeur varie.
 */
function buildFacade(cols: number, rows: number, W: number, H: number) {
  const rand = makeRandom(20240915);
  const unit = W / cols;
  const ch = H / rows;

  const bandRows = new Set([Math.round(rows * 0.32), Math.round(rows * 0.72)]);

  const blocks: WallBlock[] = [];
  const widths = [1, 1, 1, 1.5, 1.5, 2];

  for (let r = 0; r < rows; r++) {
    const y = -H / 2 + r * ch + ch * 0.5;
    const band = bandRows.has(r);

    // Départ décalé : les joints verticaux ne s'alignent jamais
    let x = -W / 2 - unit * (0.25 + rand() * 0.8);
    let guard = 0;

    while (x < W / 2 + unit * 0.4 && guard++ < 400) {
      const mult = band ? 2.5 : widths[Math.floor(rand() * widths.length)];
      const w = unit * mult;
      const depth = band ? 1.05 : 0.28 + rand() * 0.42;

      blocks.push({
        x: x + w * 0.5,
        y,
        z: depth * 0.5,
        sx: w * 0.94,
        sy: ch * (band ? 0.78 : 0.9),
        sz: depth,
        tone: 0.25 + rand() * 0.75,
        kind: band ? 1 : 0,
      });

      x += w;
    }
  }

  return { blocks, rand };
}

interface Props {
  className?: string;
}

export default function StoneWall({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ready = useSiteReady();
  const readyRef = useRef(false);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webglAvailable()) return;

    return mountScene(
      canvas,
      ({ renderer, width, height, reduced }) => {
        const small = width < 760;
        const W = small ? 19 : 33;
        const H = small ? 26 : 21;
        const cols = small ? 20 : 38;
        const rows = small ? 28 : 26;

        const { blocks, rand } = buildFacade(cols, rows, W, H);
        const count = blocks.length;

        const box = new THREE.BoxGeometry(1, 1, 1);
        const geometry = new THREE.InstancedBufferGeometry();
        geometry.index = box.index;
        geometry.setAttribute("position", box.attributes.position);
        geometry.setAttribute("normal", box.attributes.normal);
        geometry.instanceCount = count;

        const aPos = new Float32Array(count * 3);
        const aScale = new Float32Array(count * 3);
        const aOrigin = new Float32Array(count * 3);
        const aAxis = new Float32Array(count * 3);
        const aRnd = new Float32Array(count * 2);
        const aTone = new Float32Array(count);
        const aKind = new Float32Array(count);

        blocks.forEach((b, i) => {
          aPos.set([b.x, b.y, b.z], i * 3);
          aScale.set([b.sx, b.sy, b.sz], i * 3);

          // Départ : pierres en attente, loin derrière le nu du mur
          const a = rand() * Math.PI * 2;
          const radius = 9 + rand() * 20;
          aOrigin.set(
            [
              b.x + Math.cos(a) * radius * 0.6,
              b.y + Math.sin(a) * radius * 0.4,
              -9 - rand() * 24,
            ],
            i * 3
          );

          const ax = new THREE.Vector3(
            rand() - 0.5,
            rand() - 0.5,
            rand() - 0.5
          ).normalize();
          aAxis.set([ax.x, ax.y, ax.z], i * 3);

          // Les assises basses se posent en premier
          const delay = clamp(((b.y + H / 2) / H) * 0.78 + rand() * 0.22, 0, 1);
          aRnd.set([rand(), delay], i * 2);

          aTone[i] = b.tone;
          aKind[i] = b.kind;
        });

        const attr = (data: Float32Array, size: number) =>
          new THREE.InstancedBufferAttribute(data, size);

        geometry.setAttribute("aPos", attr(aPos, 3));
        geometry.setAttribute("aScale", attr(aScale, 3));
        geometry.setAttribute("aOrigin", attr(aOrigin, 3));
        geometry.setAttribute("aAxis", attr(aAxis, 3));
        geometry.setAttribute("aRnd", attr(aRnd, 2));
        geometry.setAttribute("aTone", attr(aTone, 1));
        geometry.setAttribute("aKind", attr(aKind, 1));
        geometry.boundingSphere = new THREE.Sphere(
          new THREE.Vector3(),
          Math.max(W, H) * 2.4
        );

        const uniforms = {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uScroll: { value: 0 },
          uLight: { value: new THREE.Vector2(0, 0) },
          uStone: { value: new THREE.Color("#e8dcc4") },
          uSoot: { value: new THREE.Color("#746b5e") },
          uAccent: { value: new THREE.Color("#d6ff3d") },
          uFog: { value: new THREE.Color("#0d0d10") },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;

        // Fond d'appareil : les joints se lisent comme des creux, pas des trous
        const backdrop = new THREE.Mesh(
          new THREE.PlaneGeometry(W * 1.8, H * 1.8),
          new THREE.MeshBasicMaterial({ color: new THREE.Color("#0f0f13") })
        );
        backdrop.position.z = -0.85;

        const scene = new THREE.Scene();
        scene.add(backdrop);
        scene.add(mesh);

        const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
        const camBase = new THREE.Vector3(small ? 0 : -1.9, 0.6, small ? 22 : 20.5);
        camera.position.copy(camBase);
        camera.lookAt(0, 0, 0);

        let progress = reduced ? 1 : 0;

        return {
          resize(w, h) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
          },
          frame(t, dt, p, pointer) {
            if (readyRef.current && progress < 1) {
              progress = Math.min(1, progress + dt * 0.6);
            }

            uniforms.uTime.value = t;
            uniforms.uProgress.value = progress;
            uniforms.uScroll.value = mapRange(p, 0.52, 0.96, 0, 1);

            // Tant que le curseur n'a pas bougé, le nettoyage dérive seul
            const idle = pointer.x === 0 && pointer.y === 0;
            const lx = idle ? Math.sin(t * 0.24) * W * 0.3 : pointer.x * W * 0.55;
            const ly = idle ? Math.cos(t * 0.19) * H * 0.22 : pointer.y * H * 0.45;
            uniforms.uLight.value.set(lx, ly);

            camera.position.x = camBase.x + pointer.x * 1.7;
            camera.position.y = camBase.y + pointer.y * 1.2;
            camera.lookAt(0, pointer.y * 0.25, 0);

            renderer.render(scene, camera);
          },
          dispose() {
            geometry.dispose();
            box.dispose();
            material.dispose();
            backdrop.geometry.dispose();
            (backdrop.material as THREE.Material).dispose();
          },
        };
      },
      { globalPointer: true, dprMax: 1.6 }
    );
  }, []);

  return (
    <div className={`${s.stage} ${className ?? ""}`}>
      <canvas ref={canvasRef} className={s.canvas} />
      <div className={s.vignette} aria-hidden="true" />
    </div>
  );
}
