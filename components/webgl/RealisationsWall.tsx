"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { mountScene, webglAvailable } from "@/lib/webgl";
import { realisations } from "@/lib/site";
import RealisationsRail from "../sections/RealisationsRail";
import s from "./RealisationsWall.module.css";

/* ══════════════════════════════════════════════════════════════
   Mur de réalisations en trois dimensions.

   Les panneaux sont posés sur un arc léger : celui du milieu fait
   face, ses voisins s'inclinent et reculent. La profondeur vient
   de la position et de l'ombre portée — jamais d'un voile. Une
   photo de chantier reste à pleine lumière où qu'elle se trouve,
   sinon on ne voit plus ce qu'on est venu voir.

   Sans WebGL, la même sélection s'affiche en rail plat.
   ══════════════════════════════════════════════════════════════ */

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uReady;

  varying vec2 vUv;

  /* Cadrage « cover » : la photo remplit le panneau sans être étirée. */
  vec2 coverUv(vec2 uv) {
    vec2 r = vec2(uPlaneAspect / uImageAspect, 1.0);
    if (uImageAspect < uPlaneAspect) r = vec2(1.0, uImageAspect / uPlaneAspect);
    return (uv - 0.5) * r + 0.5;
  }

  void main() {
    vec3 col = texture2D(uTexture, coverUv(vUv)).rgb;

    // Le panneau se pose sur la chaux : sans cet arrêt, un ciel clair
    // se confondrait avec le fond de la page.
    float inner = step(0.006, vUv.x) * step(vUv.x, 0.994)
                * step(0.005, vUv.y) * step(vUv.y, 0.995);
    col = mix(mix(col, vec3(0.05, 0.05, 0.06), 0.55), col, inner);

    // Fondu à l'arrivée de la texture
    col = mix(vec3(0.859, 0.831, 0.776), col, uReady);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const shadowFragment = /* glsl */ `
  precision mediump float;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    vec2 p = abs(vUv - 0.5) * 2.0;
    float d = max(p.x, p.y);
    gl_FragColor = vec4(0.05, 0.05, 0.06, smoothstep(1.0, 0.52, d) * uStrength);
  }
`;

const PLANE_W = 3.2;
const PLANE_H = 4.0;
const SPACING = 3.62;
const FOV = 42;

/**
 * Recule la caméra jusqu'à ce que le panneau du milieu tienne en entier,
 * avec de l'air autour. Sans ce calcul, un écran de téléphone — étroit et
 * haut — rogne la photo sur les quatre côtés.
 *
 * La marge est plus large horizontalement : elle laisse dépasser le
 * panneau suivant, seul indice qu'il y a une suite.
 */
function fitDistance(aspect: number) {
  const half = Math.tan((FOV * Math.PI) / 360);
  return Math.max(
    (PLANE_H * 1.22) / 2 / half,
    (PLANE_W * 1.5) / 2 / (half * Math.max(aspect, 0.2))
  );
}

export default function RealisationsWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [onCentre, setOnCentre] = useState(false);
  const activeRef = useRef(0);
  const centredRef = useRef(false);

  useEffect(() => setSupported(webglAvailable()), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!supported || !canvas) return;

    const host = canvas.parentElement as HTMLElement;
    const n = realisations.length;
    const span = SPACING * n;

    let offset = 0;
    let target = 0;
    let dragBase = 0;
    let pressed = false;
    let travelled = 0;
    let startX = 0;
    let hovered = -1;
    // Le curseur lissé démarre au centre du cadre : sans ce drapeau, un
    // panneau se croit survolé avant que la souris ait touché le mur.
    let inside = false;
    const positions = realisations.map(() => 0);

    /* ── Gestes ── */
    // Mis à jour à chaque redimensionnement : la caméra ne reste pas
    // à la même distance d'un format d'écran à l'autre.
    let worldPerPx = 0.01;

    const onDown = (e: PointerEvent) => {
      pressed = true;
      travelled = 0;
      startX = e.clientX;
      dragBase = target;
      setDragging(true);
      host.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      travelled = Math.max(travelled, Math.abs(dx));
      target = dragBase - dx * worldPerPx;
    };
    const onUp = (e: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      setDragging(false);
      host.releasePointerCapture?.(e.pointerId);
      target = Math.round(target / SPACING) * SPACING;

      // Un clic net vise un panneau ; un glissement, non. Viser un
      // panneau de côté l'amène au centre ; viser celui du centre ouvre
      // sa fiche — on ne part jamais sur une page qu'on ne regardait pas.
      if (travelled >= 6 || hovered < 0) return;
      if (hovered === activeRef.current) {
        host.dispatchEvent(new CustomEvent("pmsb:open"));
      } else {
        target = Math.round((offset + positions[hovered]) / SPACING) * SPACING;
      }
    };

    const onEnter = () => { inside = true; };
    const onLeave = () => { inside = false; };
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);

    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const onStep = (e: Event) => {
      const dir = (e as CustomEvent<1 | -1>).detail;
      target = Math.round(target / SPACING) * SPACING + dir * SPACING;
    };
    host.addEventListener("pmsb:step", onStep);

    const cleanupEvents = () => {
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      host.removeEventListener("pmsb:step", onStep);
    };

    const dispose = mountScene(
      canvas,
      ({ renderer, width, height }) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 40);

        const frameCamera = (w: number, h: number) => {
          const aspect = w / Math.max(h, 1);
          camera.aspect = aspect;
          camera.position.z = fitDistance(aspect);
          camera.updateProjectionMatrix();

          const visibleW =
            2 * camera.position.z * Math.tan((FOV * Math.PI) / 360) * aspect;
          worldPerPx = visibleW / Math.max(w, 1);
        };
        frameCamera(width, height);

        const geometry = new THREE.PlaneGeometry(PLANE_W, PLANE_H);
        const shadowGeometry = new THREE.PlaneGeometry(PLANE_W * 1.2, PLANE_H * 1.16);
        const loader = new THREE.TextureLoader();

        const panels = realisations.map((item, i) => {
          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
              uTexture: { value: null as THREE.Texture | null },
              uImageAspect: { value: PLANE_W / PLANE_H },
              uPlaneAspect: { value: PLANE_W / PLANE_H },
              uReady: { value: 0 },
            },
          });

          loader.load(item.after, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            const img = texture.image as HTMLImageElement | undefined;
            if (img?.width) {
              material.uniforms.uImageAspect.value = img.width / img.height;
            }
            material.uniforms.uTexture.value = texture;
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData.index = i;

          // Ombre portée : enfant du panneau, elle suit son inclinaison
          const shadow = new THREE.Mesh(
            shadowGeometry,
            new THREE.ShaderMaterial({
              vertexShader,
              fragmentShader: shadowFragment,
              uniforms: { uStrength: { value: 0 } },
              transparent: true,
              depthWrite: false,
            })
          );
          shadow.position.set(0, -0.08, -0.04);
          mesh.add(shadow);

          scene.add(mesh);
          return mesh;
        });

        const raycaster = new THREE.Raycaster();

        return {
          resize: frameCamera,
          frame(t, dt, p, pointer) {
            // Le défilement de la page fait doucement tourner le mur
            const drive = pressed ? 0 : (p - 0.5) * SPACING * 1.15;
            const goal = target + drive;
            offset += (goal - offset) * (1 - Math.exp(-5 * dt));

            const hits = inside
              ? (raycaster.setFromCamera(pointer, camera),
                 raycaster.intersectObjects(panels, false))
              : [];
            hovered = hits.length ? (hits[0].object.userData.index as number) : -1;

            const onCentre = hovered >= 0 && hovered === activeRef.current;
            if (onCentre !== centredRef.current) {
              centredRef.current = onCentre;
              setOnCentre(onCentre);
            }

            panels.forEach((mesh, i) => {
              // Enroulement : un panneau sorti d'un côté rentre de l'autre
              let x = i * SPACING - offset;
              x = (((x + span / 2) % span) + span) % span - span / 2;

              const away = Math.abs(x) / SPACING;
              const focus = Math.max(0, 1 - away);

              positions[i] = x;
              mesh.position.x = x;
              mesh.position.y = 0;
              mesh.position.z = -away * 0.62 + (hovered === i ? 0.18 : 0);
              mesh.rotation.y = -Math.sign(x) * Math.min(Math.abs(x) * 0.085, 0.32);

              const scale = 1 + focus * 0.05;
              mesh.scale.setScalar(scale);

              const mat = mesh.material as THREE.ShaderMaterial;
              const ready = mat.uniforms.uTexture.value ? 1 : 0;
              mat.uniforms.uReady.value +=
                (ready - mat.uniforms.uReady.value) * (1 - Math.exp(-6 * dt));

              const shadow = mesh.children[0] as THREE.Mesh;
              const sm = shadow.material as THREE.ShaderMaterial;
              sm.uniforms.uStrength.value = 0.1 + focus * 0.16;
            });

            const index = (((Math.round(offset / SPACING) % n) + n) % n);
            if (index !== activeRef.current) {
              activeRef.current = index;
              setActive(index);
            }

            renderer.render(scene, camera);
          },
          dispose() {
            geometry.dispose();
            shadowGeometry.dispose();
            panels.forEach((mesh) => {
              const mat = mesh.material as THREE.ShaderMaterial;
              (mat.uniforms.uTexture.value as THREE.Texture | null)?.dispose();
              mat.dispose();
              const shadow = mesh.children[0] as THREE.Mesh;
              shadow.geometry.dispose();
              (shadow.material as THREE.Material).dispose();
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
  }, [supported]);

  /* Un clic sur un panneau ouvre sa fiche : la navigation reste à React. */
  const linkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const host = canvasRef.current?.parentElement;
    if (!host) return;
    const open = () => linkRef.current?.click();
    host.addEventListener("pmsb:open", open);
    return () => host.removeEventListener("pmsb:open", open);
  }, [supported]);

  if (supported === false) return <RealisationsRail />;

  const current = realisations[active];

  /* Le mur s'enroule : on avance d'un cran, jamais jusqu'à une butée. */
  const step = (dir: 1 | -1) =>
    canvasRef.current?.parentElement?.dispatchEvent(
      new CustomEvent("pmsb:step", { detail: dir })
    );

  return (
    <div className={s.wall}>
      <div
        className={s.stage}
        data-dragging={dragging}
        data-cursor={onCentre ? "Voir" : "Glisser"}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} />
      </div>

      {/* Cible du clic sur un panneau, et lien visible de la fiche */}
      <div className={s.meta}>
        <div className={s.captions}>
          {realisations.map((item, i) => (
            <div
              key={item.slug}
              className={s.caption}
              data-active={i === active}
              aria-hidden={i !== active}
            >
              <div className={s.captionTags}>
                <span className={`mono ${s.captionIndex}`}>
                  [ {String(i + 1).padStart(2, "0")} ]
                </span>
                <span className={`mono ${s.captionPlace}`}>
                  {item.place ?? item.category}
                </span>
                {item.before && (
                  <span className={`mono ${s.captionBadge}`}>Avant / Après</span>
                )}
              </div>
              <h3 className={`display ${s.captionTitle}`}>{item.title}</h3>
            </div>
          ))}
        </div>

        <div className={s.actions}>
          <Link
            ref={linkRef}
            href={`/realisations#${current.slug}`}
            className={`mono swipe-link ${s.open}`}
          >
            Voir ce chantier
            <span aria-hidden="true"> →</span>
          </Link>

          {/* Flèches et compteur plutôt qu'une pastille par chantier :
              la commande garde la même taille quel qu'en soit le nombre. */}
          <div className={s.nav}>
            <button type="button" className={s.arrow} onClick={() => step(-1)}>
              <span className="sr-only">Chantier précédent</span>
              <span aria-hidden="true">←</span>
            </button>

            <span className={`mono ${s.counter}`} aria-live="polite">
              <span className={s.counterNow}>
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className={s.counterSep}>/</span>
              {String(realisations.length).padStart(2, "0")}
            </span>

            <button type="button" className={s.arrow} onClick={() => step(1)}>
              <span className="sr-only">Chantier suivant</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
