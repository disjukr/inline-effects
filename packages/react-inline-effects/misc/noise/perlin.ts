import * as pcg8i from "../prng/pcg8i";

// returns -1 ~ 1
export type PerlinNoiseFn = (x: number, y: number, z: number) => number;

/**
 * @param seed `0` ~ `0xff`
 */
export function getPerlinNoiseFn(seed: number, seq: number = 0): PerlinNoiseFn {
  const p: number[] = Array(512);
  const rng: pcg8i.pcg8i_random_t = { state: 0, inc: 0 };
  pcg8i.pcg8i_srandom_r(rng, seed, seq);
  for (let i = 0; i < 512; ++i) p[i] = pcg8i.pcg8i_random_r(rng);
  // https://mrl.cs.nyu.edu/~perlin/noise/
  return function perlin(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = p[X] + Y;
    const AA = p[A] + Z;
    const AB = p[A + 1] + Z;
    const B = p[X + 1] + Y;
    const BA = p[B] + Z;
    const BB = p[B + 1] + Z;
    return lerp(
      w,
      lerp(
        v,
        lerp(
          u,
          grad(p[AA], x, y, z),
          grad(p[BA], x - 1, y, z),
        ),
        lerp(
          u,
          grad(p[AB], x, y - 1, z),
          grad(p[BB], x - 1, y - 1, z),
        ),
      ),
      lerp(
        v,
        lerp(
          u,
          grad(p[AA + 1], x, y, z - 1),
          grad(p[BA + 1], x - 1, y, z - 1),
        ),
        lerp(
          u,
          grad(p[AB + 1], x, y - 1, z - 1),
          grad(p[BB + 1], x - 1, y - 1, z - 1),
        ),
      ),
    );
  };
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number, z: number): number {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h == 12 || h == 14 ? x : z;
  return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
}
