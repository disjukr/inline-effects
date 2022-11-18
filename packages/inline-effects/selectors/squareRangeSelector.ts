import invLerp from "../misc/math/invLerp";
import { Selector } from "../type";

export interface SquareRangeSelectorConfig {
  start?: number;
  end?: number;
  offset?: number;
}
export default function squareRangeSelector<T = any>(
  { start = 0, end = 1, offset = 0 }: SquareRangeSelectorConfig,
): Selector<T> {
  const s = start + offset;
  const e = end + offset;
  const d = e - s;
  if (d < Number.EPSILON) return () => () => 0;
  return ({ length }) => {
    const one = 1 / length;
    const half = one / 2;
    return (index) => {
      const v = index / length + half;
      if (v <= s || v >= e) return 0;
      const ss = s + half;
      const ee = e - half;
      const st = Math.min(invLerp(s, ss, v), 1);
      const et = Math.min(invLerp(e, ee, v), 1);
      return Math.min(st, et);
    };
  };
}
