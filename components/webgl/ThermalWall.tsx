"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { mountScene, webglAvailable } from "@/lib/webgl";
import { makeRandom } from "@/lib/utils";
import s from "./ThermalWall.module.css";

/* ══════════════════════════════════════════════════════════════
   Coupe de mur isolé par l'extérieur.

   Le mur porteur est en place ; l'isolant puis l'enduit de
   finition viennent se poser devant. Les particules représentent
   les déperditions de chaleur : chaudes et fuyantes à nu, freinées
   et refroidies une fois le complexe posé.
   ══════════════════════════════════════════════════════════════ */

const pointVertex = /* glsl */ `
  attribute float aHeat;
  attribute float aSize;

  uniform float uPixelRatio;

  varying float vHeat;

  void main() {
    vHeat = aHeat;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (13.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const pointFragment = /* glsl */ `
  precision highp float;

  varying float vHeat;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float halo = smoothstep(0.5, 0.0, d);

    vec3 cold = vec3(0.24, 0.52, 0.86);
    vec3 warm = vec3(0.98, 0.42, 0.12);
    vec3 hot  = vec3(1.0, 0.86, 0.42);

    vec3 col = mix(cold, warm, smoothstep(0.15, 0.62, vHeat));
    col = mix(col, hot, smoothstep(0.7, 1.0, vHeat));

    gl_FragColor = vec4(col, halo * (0.22 + vHeat * 0.78));
  }
`;

const COUNT = 420;

interface Props {
  insulated: boolean;
  onLayer?: (index: number) => void;
}

export default function ThermalWall({ insulated }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef(0);

  useEffect(() => {
    targetRef.current = insulated ? 1 : 0;
  }, [insulated]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webglAvailable()) return;

    return mountScene(
      canvas,
      ({ renderer, width, height }) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 80);
        camera.position.set(7.2, 1.9, 4.2);
        camera.lookAt(0, 0, 0.45);

        scene.add(new THREE.AmbientLight(0xffffff, 0.55));
        scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x2a2620, 0.8));
        const key = new THREE.DirectionalLight(0xfff2dd, 1.5);
        key.position.set(-4, 6, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xd6ff3d, 0.45);
        rim.position.set(5, -2, -4);
        scene.add(rim);

        const W = 4.4;
        const H = 3.2;

        /* ── Couches du complexe ── */
        const layers = [
          { d: 0.95, z: 0, color: "#5d564c", from: 0 }, // mur porteur
          { d: 0.6, z: 0.78, color: "#c8d29c", from: 8 }, // isolant
          { d: 0.14, z: 1.15, color: "#e9e3d6", from: 8 }, // enduit de finition
        ];

        const meshes = layers.map((layer) => {
          const geo = new THREE.BoxGeometry(W, H, layer.d);
          const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(layer.color),
            roughness: 0.86,
            metalness: 0.02,
            transparent: true,
            opacity: 1,
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(layer.from, 0, layer.z);
          scene.add(mesh);
          return mesh;
        });

        // Fine ligne de rappel sur l'arête du complexe
        const edge = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(W, H, 0.14)),
          new THREE.LineBasicMaterial({ color: 0xd6ff3d, transparent: true, opacity: 0 })
        );
        edge.position.set(0, 0, 1.15);
        scene.add(edge);

        /* ── Particules de déperdition ── */
        const rand = makeRandom(77);
        const positions = new Float32Array(COUNT * 3);
        const heats = new Float32Array(COUNT);
        const sizes = new Float32Array(COUNT);
        const speeds = new Float32Array(COUNT);
        const drift = new Float32Array(COUNT * 2);

        const reset = (i: number) => {
          positions[i * 3] = (rand() - 0.5) * W * 0.92;
          positions[i * 3 + 1] = (rand() - 0.5) * H * 0.92;
          positions[i * 3 + 2] = -0.75 - rand() * 1.6;
          heats[i] = 0.85 + rand() * 0.15;
          sizes[i] = 3.2 + rand() * 5.0;
          speeds[i] = 0.5 + rand() * 1.1;
          drift[i * 2] = (rand() - 0.5) * 0.35;
          drift[i * 2 + 1] = 0.1 + rand() * 0.45;
        };
        for (let i = 0; i < COUNT; i++) reset(i);

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        pGeo.setAttribute("aHeat", new THREE.BufferAttribute(heats, 1));
        pGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

        const pMat = new THREE.ShaderMaterial({
          vertexShader: pointVertex,
          fragmentShader: pointFragment,
          uniforms: { uPixelRatio: { value: renderer.getPixelRatio() } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(pGeo, pMat);
        scene.add(points);

        let progress = 0;

        return {
          resize(w, h) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
          },
          frame(t, dt, p, pointer) {
            // Pose du complexe, couche après couche
            progress += (targetRef.current - progress) * (1 - Math.exp(-3.4 * dt));

            const l1 = THREE.MathUtils.clamp(progress / 0.6, 0, 1);
            const l2 = THREE.MathUtils.clamp((progress - 0.45) / 0.55, 0, 1);
            const ease = (x: number) => 1 - Math.pow(1 - x, 3);

            meshes[1].position.x = layers[1].from * (1 - ease(l1));
            (meshes[1].material as THREE.MeshStandardMaterial).opacity = l1;
            meshes[2].position.x = layers[2].from * (1 - ease(l2));
            (meshes[2].material as THREE.MeshStandardMaterial).opacity = l2;

            (edge.material as THREE.LineBasicMaterial).opacity = l2 * 0.5;

            // Barrière thermique : là où la chaleur est arrêtée
            const barrier = 0.5 + progress * 1.3;

            for (let i = 0; i < COUNT; i++) {
              const z = i * 3 + 2;
              positions[z] += speeds[i] * dt * (0.7 + (1 - progress) * 1.2);
              positions[i * 3] += drift[i * 2] * dt;
              positions[i * 3 + 1] += drift[i * 2 + 1] * dt;

              // Plus la particule s'éloigne, plus elle se refroidit
              const escaped = positions[z] > barrier;
              heats[i] += ((escaped ? 0.08 : 0.95) - heats[i]) * dt * 3.2;

              if (positions[z] > barrier + 2.6 - progress * 2.1) reset(i);
            }

            pGeo.attributes.position.needsUpdate = true;
            pGeo.attributes.aHeat.needsUpdate = true;

            // Légère orbite pilotée par le curseur
            const ang = 1.02 + pointer.x * 0.16;
            const r = 8.2;
            camera.position.set(
              Math.sin(ang) * r,
              1.8 + pointer.y * 0.8,
              Math.cos(ang) * r
            );
            camera.lookAt(0, 0, 0.45);

            renderer.render(scene, camera);
          },
          dispose() {
            meshes.forEach((m) => {
              m.geometry.dispose();
              (m.material as THREE.Material).dispose();
            });
            edge.geometry.dispose();
            (edge.material as THREE.Material).dispose();
            pGeo.dispose();
            pMat.dispose();
          },
        };
      },
      { dprMax: 1.6 }
    );
  }, []);

  return (
    <div className={s.stage}>
      <canvas ref={canvasRef} />
      <span className={`mono ${s.sideIn}`}>Intérieur</span>
      <span className={`mono ${s.sideOut}`}>Extérieur</span>
    </div>
  );
}
