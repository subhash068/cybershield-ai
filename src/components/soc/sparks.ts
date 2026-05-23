export const sparkData = (seed: number, n = 24) =>
  Array.from({ length: n }, (_, i) => ({
    v: 30 + Math.sin((i + seed) / 2.2) * 18 + ((i * 9301 + seed * 17) % 23),
  }));
