import invLerp from "../../misc/math/invLerp";
import { Selector } from "../type";

export interface RampDownRangeSelectorConfig {
  start?: number;
  end?: number;
  offset?: number;
}
export default function rampDownRangeSelector(
  { start = 0, end = 1, offset = 0 }: RampDownRangeSelectorConfig,
): Selector {
  const s = start + offset;
  const e = end + offset;
  return ({ length }) => {
    const one = 1 / length;
    const half = one / 2;
    return (index) => {
      const t = index / length + half;
      const ss = s + half;
      if (t <= ss) return 1;
      const ee = e - half;
      if (t >= ee) return 0;
      return invLerp(ee, ss, t);
    };
  };
}
