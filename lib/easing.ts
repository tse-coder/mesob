export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function remap(value: number, inMin: number, inMax: number): number {
  return clamp01((value - inMin) / (inMax - inMin));
}

export function smoothstep(
  value: number,
  edge0: number,
  edge1: number,
): number {
  const t = remap(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}

export function lidEase(t: number): number {
  const RESIST_END = 0.35;
  const RESIST_AMOUNT = 0.12;

  if (t <= 0) return 0;
  if (t >= 1) return 1;

  if (t < RESIST_END) {
    const local = t / RESIST_END;
    return RESIST_AMOUNT * local * local * local;
  }

  const local = (t - RESIST_END) / (1 - RESIST_END);
  const eased = 1 - Math.pow(1 - local, 3);
  return RESIST_AMOUNT + (1 - RESIST_AMOUNT) * eased;
}
