/**
 * ```
 * f(0, p0, p1, p2, p3) // p0
 * f(1, p0, p1, p2, p3) // p1
 * f(2, p0, p1, p2, p3) // p2
 * f(3, p0, p1, p2, p3) // p3
 * ```
 */
export default function uniformCatmullRom(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number,
): number {
  const _1_t = 1 - t;
  const _2_t = 2 - t;
  const _3_t = 3 - t;
  const t_1 = t - 1;
  const a1 = _1_t * p0 + t * p1;
  const a2 = _2_t * p1 + t_1 * p2;
  const a3 = _3_t * p2 + (t - 2) * p3;
  const b1 = _2_t / 2 * a1 + t / 2 * a2;
  const b2 = _3_t / 2 * a2 + t_1 / 2 * a3;
  const c1 = _2_t * b1 + t_1 * b2;
  return c1;
}
