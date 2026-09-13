import * as THREE from "three";
import { clamp, prefersReducedMotion } from "./utils";

export interface SceneContext {
  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;
  /** Élément observé pour la progression au scroll (parent du canvas). */
  host: HTMLElement;
  width: number;
  height: number;
  reduced: boolean;
}

export interface SceneHandlers {
  resize?: (width: number, height: number) => void;
  /**
   * @param t     temps écoulé en secondes
   * @param dt    delta en secondes (borné)
   * @param p     progression du conteneur dans le viewport, 0 → 1
   * @param pointer position normalisée du curseur (-1 → 1) lissée
   */
  frame: (t: number, dt: number, p: number, pointer: THREE.Vector2) => void;
  dispose?: () => void;
}

export interface MountOptions {
  alpha?: boolean;
  dprMax?: number;
  antialias?: boolean;
  /** Suit le curseur sur toute la fenêtre plutôt que sur le canvas. */
  globalPointer?: boolean;
}

export function webglAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Monte une scène Three.js sur un canvas :
 * - crée le renderer et gère le redimensionnement
 * - met la boucle en pause hors viewport ou onglet caché
 * - calcule la progression au scroll et la position lissée du curseur
 * Retourne la fonction de démontage.
 */
export function mountScene(
  canvas: HTMLCanvasElement,
  build: (ctx: SceneContext) => SceneHandlers,
  opts: MountOptions = {}
): () => void {
  const { alpha = true, dprMax = 1.75, antialias = true, globalPointer = false } = opts;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha,
      antialias,
      powerPreference: "high-performance",
    });
  } catch {
    return () => {};
  }

  const host = (canvas.parentElement as HTMLElement) ?? canvas;
  const reduced = prefersReducedMotion();

  const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  let width = Math.max(1, host.clientWidth);
  let height = Math.max(1, host.clientHeight);
  renderer.setSize(width, height, false);

  const ctx: SceneContext = { renderer, canvas, host, width, height, reduced };
  const handlers = build(ctx);

  /* ── Redimensionnement ─────────────────────────────────────── */
  const ro = new ResizeObserver(() => {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    if (w === width && h === height) return;
    width = ctx.width = w;
    height = ctx.height = h;
    renderer.setSize(w, h, false);
    handlers.resize?.(w, h);
  });
  ro.observe(host);

  /* ── Curseur ───────────────────────────────────────────────── */
  const pointerTarget = new THREE.Vector2(0, 0);
  const pointer = new THREE.Vector2(0, 0);

  const onPointerMove = (e: PointerEvent) => {
    if (globalPointer) {
      pointerTarget.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    } else {
      const r = host.getBoundingClientRect();
      pointerTarget.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -(((e.clientY - r.top) / r.height) * 2 - 1)
      );
    }
  };
  const pointerHost: HTMLElement | Window = globalPointer ? window : host;
  pointerHost.addEventListener("pointermove", onPointerMove as EventListener, {
    passive: true,
  });

  /* ── Visibilité ────────────────────────────────────────────── */
  let onScreen = true;
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
    },
    { rootMargin: "200px 0px" }
  );
  io.observe(host);

  let tabVisible = !document.hidden;
  const onVisibility = () => {
    tabVisible = !document.hidden;
    last = performance.now();
  };
  document.addEventListener("visibilitychange", onVisibility);

  /* ── Boucle ────────────────────────────────────────────────── */
  let raf = 0;
  let last = performance.now();
  const start = last;

  const loop = () => {
    raf = requestAnimationFrame(loop);
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 1 / 24);
    last = now;
    if (!onScreen || !tabVisible) return;

    const rect = host.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const p = clamp((vh - rect.top) / (vh + rect.height));

    const k = 1 - Math.exp(-6 * dt);
    pointer.x += (pointerTarget.x - pointer.x) * k;
    pointer.y += (pointerTarget.y - pointer.y) * k;

    handlers.frame((now - start) / 1000, dt, p, pointer);
  };
  raf = requestAnimationFrame(loop);

  /* ── Démontage ─────────────────────────────────────────────── */
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    pointerHost.removeEventListener("pointermove", onPointerMove as EventListener);
    handlers.dispose?.();
    renderer.dispose();
  };
}

/** Libère récursivement géométries, matériaux et textures d'une scène. */
export function disposeScene(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (!mat) return;
    const list = Array.isArray(mat) ? mat : [mat];
    list.forEach((m) => {
      Object.values(m as unknown as Record<string, unknown>).forEach((v) => {
        if (v instanceof THREE.Texture) v.dispose();
      });
      m.dispose();
    });
  });
}

/** Quad plein écran : base commune des scènes purement fragment. */
export function fullscreenQuad(material: THREE.ShaderMaterial) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));
  return { scene, camera, geometry };
}
