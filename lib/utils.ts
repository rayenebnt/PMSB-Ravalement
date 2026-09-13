export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Interpolation indépendante du framerate. */
export const damp = (a: number, b: number, lambda: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-lambda * dt));

export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => outMin + ((clamp(v, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin);

/** PRNG déterministe : les scènes 3D sont identiques à chaque chargement. */
export function makeRandom(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
