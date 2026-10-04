export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rand: () => number) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Geometric random walk, deterministic for a given seed. */
export function walk(seed: number, n: number, { drift = 0, vol = 0.02, start = 1 } = {}) {
  const rand = rng(seed);
  const out = [start];
  for (let i = 1; i < n; i++) out.push(out[i - 1] * Math.exp(drift + vol * gaussian(rand)));
  return out;
}

export function seedFrom(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function movingAverage(xs: number[], w: number) {
  return xs.map((_, i) => {
    const s = Math.max(0, i - w + 1);
    const slice = xs.slice(s, i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

/** Map a series to an SVG path inside a width×height box. */
export function toPath(xs: number[], width: number, height: number, pad = 4, range?: [number, number]) {
  const [lo, hi] = range ?? [Math.min(...xs), Math.max(...xs)];
  const span = hi - lo || 1;
  return xs
    .map((v, i) => {
      const x = (i / (xs.length - 1)) * width;
      const y = pad + (1 - (v - lo) / span) * (height - pad * 2);
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join('');
}
