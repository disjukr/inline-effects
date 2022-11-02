import invLerp from "../../misc/math/invLerp";
import { Selector } from "../type";

export interface SquareRangeSelectorConfig {
  start?: number;
  end?: number;
  offset?: number;
}
export default function squareRangeSelector(
  { start = 0, end = 1, offset = 0 }: SquareRangeSelectorConfig,
): Selector {
  const s = start + offset;
  const e = end + offset;
  const d = e - s;
  if (d < Number.EPSILON) return () => () => 0;
  return ({ length }) => {
    const one = 1 / length;
    const half = one / 2;
    return (index) => {
      const t = index / length + half;
      if (t <= s || t >= e) return 0;
      const ss = s + half;
      const ee = e - half;
      const vs = Math.min(invLerp(s, ss, t), 1);
      const ve = Math.min(invLerp(e, ee, t), 1);
      return Math.min(vs, ve);
    };
  };
}
