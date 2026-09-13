"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { mountScene, webglAvailable } from "@/lib/webgl";
import { realisations } from "@/lib/site";
import s from "./Gallery3D.module.css";

/* ══════════════════════════════════════════════════════════════
   Galerie en trois dimensions.
   Les visuels sont posés sur des plans que l'on fait défiler à la
   souris ou au doigt. Plus le geste est vif, plus les plans se
   courbent et se décomposent en franges colorées.
   ══════════════════════════════════════════════════════════════ */

const vertexShader = /* glsl */ `
  uniform float uVelocity;
  uniform float uHover;

  varying vec2 vUv;
  varying float vBend;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Courbure : le plan se creuse dans le sens du mouvement
    float arc = sin(uv.x * 3.14159);
    pos.z -= arc * abs(uVelocity) * 2.4;
    pos.z -= arc * 0.22;                       // légère courbure au repos
    pos.y += arc * uVelocity * 0.35;
    pos.z += uHover * 0.28;

    vBend = arc * uVelocity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uVelocity;
  uniform float uHover;
  uniform float uFocus;
  uniform vec3  uAccent;

  varying vec2 vUv;
  varying float vBend;

  // Cadrage « cover »
  vec2 coverUv(vec2 uv) {
    vec2 r = vec2(uPlaneAspect / uImageAspect, 1.0);
    if (uImageAspect < uPlaneAspect) r = vec2(1.0, uImageAspect / uPlaneAspect);
    return (uv - 0.5) * r + 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv);

    // Franges chromatiques proportionnelles à la vitesse
    float shift = clamp(abs(uVelocity), 0.0, 1.0) * 0.028;
    vec3 col;
    col.r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    col.g = texture2D(uTexture, uv).g;
    col.b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;

    // Les visuels hors focus reculent dans l'ombre
    col = mix(col * 0.36, col, uFocus);
    col = mix(col, col * 1.1, uHover);

    // Voile sur les bords du plan
    float edge = smoothstep(0.0, 0.045, vUv.x) * smoothstep(1.0, 0.955, vUv.x)
               * smoothstep(0.0, 0.035, vUv.y) * smoothstep(1.0, 0.965, vUv.y);
    col = mix(vec3(0.051, 0.051, 0.063), col, edge);

    // Liseré vif dans le sens du geste
    col += uAccent * abs(vBend) * 0.16;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Gallery3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !webglAvailable()) return;

    const host = canvas.parentElement as HTMLElement;
    const n = realisations.length;
    const spacing = 3.85;
    const span = spacing * n;

    let offset = 0;
    let offsetTarget = 0;
    let dragBase = 0;
    let velocity = 0;
    let pointerDown = false;
    let startX = 0;
    let hovered = -1;

    /* ── Gestes ── */
    const pxToWorld = () => spacing / Math.max(host.clientWidth / 3.6, 1);

    const onDown = (e: PointerEvent) => {
      pointerDown = true;
      startX = e.clientX;
      dragBase = offsetTarget;
      setDragging(true);
      host.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      offsetTarget = dragBase - (e.clientX - startX) * pxToWorld();
    };
    const onUp = (e: PointerEvent) => {
      if (!pointerDown) return;
      pointerDown = false;
      setDragging(false);
      host.releasePointerCapture?.(e.pointerId);
      // Aimantation sur le visuel le plus proche
      offsetTarget = Math.round(offsetTarget / spacing) * spacing;
    };

    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const goTo = (e: Event) => {
      const index = (e as CustomEvent<number>).detail;
      offsetTarget = index * spacing;
    };
    host.addEventListener("pmsb:goto", goTo);

    const cleanupEvents = () => {
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      host.removeEventListener("pmsb:goto", goTo);
    };

    const dispose = mountScene(
      canvas,
      ({ renderer, width, height }) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 60);
        camera.position.z = 5.2;

        const planeW = 3.0;
        const planeH = 3.85;
        const geometry = new THREE.PlaneGeometry(planeW, planeH, 28, 28);
        const loader = new THREE.TextureLoader();

        const meshes = realisations.map((item, i) => {
          const texture = loader.load(item.image, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            const img = tex.image as HTMLImageElement;
            if (img?.width) {
              material.uniforms.uImageAspect.value = img.width / img.height;
            }
          });
          texture.colorSpace = THREE.SRGBColorSpace;

          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
              uTexture: { value: texture },
              uImageAspect: { value: 1.4 },
              uPlaneAspect: { value: planeW / planeH },
              uVelocity: { value: 0 },
              uHover: { value: 0 },
              uFocus: { value: 0 },
              uAccent: { value: new THREE.Color("#d6ff3d") },
            },
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData.index = i;
          scene.add(mesh);
          return mesh;
        });

        const raycaster = new THREE.Raycaster();

        return {
          resize(w, h) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
          },
          frame(t, dt, p, pointer) {
            // Le défilement de la page fait aussi avancer la galerie
            const scrollDrive = (p - 0.5) * spacing * 1.6;
            const goal = offsetTarget + (pointerDown ? 0 : scrollDrive);

            const prev = offset;
            offset += (goal - offset) * (1 - Math.exp(-4.5 * dt));
            velocity = THREE.MathUtils.clamp((offset - prev) / Math.max(dt, 0.001) * 0.06, -1.4, 1.4);

            // Survol
            raycaster.setFromCamera(pointer, camera);
            const hits = raycaster.intersectObjects(meshes, false);
            hovered = hits.length ? (hits[0].object.userData.index as number) : -1;

            meshes.forEach((mesh, i) => {
              // Enroulement : les plans réapparaissent de l'autre côté
              let x = i * spacing - offset;
              x = ((x + span / 2) % span + span) % span - span / 2;

              mesh.position.x = x;
              mesh.position.z = -Math.abs(x) * 0.5;
              mesh.rotation.y = -x * 0.15;
              mesh.position.y = Math.sin(x * 0.42) * 0.1;

              const u = mesh.material as THREE.ShaderMaterial;
              const focus = 1 - Math.min(Math.abs(x) / (spacing * 1.25), 1);
              u.uniforms.uFocus.value +=
                (0.25 + focus * 0.75 - u.uniforms.uFocus.value) * 0.14;
              u.uniforms.uVelocity.value +=
                (velocity - u.uniforms.uVelocity.value) * 0.22;
              u.uniforms.uHover.value +=
                ((hovered === i ? 1 : 0) - u.uniforms.uHover.value) * 0.12;
            });

            const idx =
              ((Math.round(offset / spacing) % n) + n) % n;
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }

            renderer.render(scene, camera);
          },
          dispose() {
            geometry.dispose();
            meshes.forEach((m) => {
              const mat = m.material as THREE.ShaderMaterial;
              (mat.uniforms.uTexture.value as THREE.Texture)?.dispose();
              mat.dispose();
            });
          },
        };
      },
      { dprMax: 1.6 }
    );

    return () => {
      cleanupEvents();
      dispose();
    };
  }, []);

  const goTo = (index: number) => {
    const host = canvasRef.current?.parentElement;
    host?.dispatchEvent(new CustomEvent("pmsb:goto", { detail: index }));
  };

  return (
    <div className={s.gallery}>
      <div className={s.stage} data-dragging={dragging} data-cursor="Glisser">
        <canvas ref={canvasRef} />
      </div>

      <div className={s.meta}>
        <div className={s.captionWrap}>
          {realisations.map((item, i) => (
            <p
              key={item.text}
              className={s.caption}
              data-active={i === active}
              aria-hidden={i !== active}
            >
              {item.text}
            </p>
          ))}
        </div>

        <div className={s.dots}>
          {realisations.map((item, i) => (
            <button
              key={item.place}
              type="button"
              className={s.dot}
              data-active={i === active}
              onClick={() => goTo(i)}
            >
              <span className="sr-only">Voir : {item.text}</span>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <i />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
