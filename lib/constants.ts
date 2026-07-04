export type Vec3 = [number, number, number];

export const COLORS = {
  background: "#0b0705",
  fog: "#0b0705",
  ground: "#161009",
  keyLight: "#ffd9b0",
  fillLight: "#5d6bb0",
  rimLight: "#ff8c4a",
  emberGlow: "#ff9a3c",
  gold: "#ffb84d",
  text: "#ffd27a",
} as const;

export const SCROLL = {
  pages: 4,
  scrub: 0.9,
} as const;

export const CAMERA = {
  fov: 42,
  keyframes: [
    [4.6, 0.9, 5.2],
    [5.2, 1.9, 2.4],
    [3.2, 3.1, 2.4],
    [0.0, 4.3, 1.4],
  ] as Vec3[],
  lookAtStart: [0, 1.35, 0] as Vec3,
  lookAtEnd: [0, 1.05, 0] as Vec3,
} as const;

export const MESOB = {
  rimHeight: 1.6,
  rimRadius: 1.06,
  interiorFloorY: 1.05,
} as const;

export const LID = {
  start: 0.15,
  end: 0.85,
  maxAngle: (85 * Math.PI) / 180,
} as const;

export const GLOW = {
  start: 0.35,
  maxLightIntensity: 22,
} as const;

export const PARTICLES = {
  count: 90,
  emitY: 1.15,
  riseHeight: 1.8,
  size: 0.03,
  maxOpacity: 0.85,
} as const;

export const TEXT = {
  revealStart: 0.78,
  revealEnd: 0.97,
  height: 1.42,
  fontSize: 0.26,
} as const;
