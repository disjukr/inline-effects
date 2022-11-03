import invLerp from "../../misc/math/invLerp";
import { Selector } from "../type";

export type RampFn = (t: number) => number;

export interface RampUpRangeSelectorConfig {
  start?: number;
  end?: number;
  offset?: number;
  fn?: RampFn;
}
export default function rampRangeSelector(
  { start = 0, end = 1, offset = 0, fn = rampUp }: RampUpRangeSelectorConfig,
): Selector {
  const s = start + offset;
  const e = end + offset;
  return ({ length }) => {
    const one = 1 / length;
    const half = one / 2;
    return (index) => {
      const v = index / length + half;
      const ss = s + half;
      if (v <= ss) return fn(0);
      const ee = e - half;
      if (v >= ee) return fn(1);
      const t = invLerp(ss, ee, v);
      return fn(t);
    };
  };
}

export function rampUp(t: number): number {
  return t;
}

export function rampDown(t: number): number {
  return 1 - t;
}
