import invLerp from "./misc/math/invLerp";
import lerp from "./misc/math/lerp";

export interface Keyframe<T> {
  t: number; // time
  v: T; // value
  e?: (t: number) => number; // easing function
}
export default function keyframes<T>(
  interpolate: (a: T, b: T, t: number) => T,
  keyframes: Keyframe<T>[],
): (t: number) => T {
  if (keyframes.length < 1) {
    throw new Error("At least one keyframe is required.");
  } else if (keyframes.length === 1) {
    return () => keyframes[0].v;
  }
  const ts = keyframes.map(({ t }) => t);
  const first = keyframes[0];
  const last = keyframes[keyframes.length - 1];
  return (t) => {
    const i = bisectRight(ts, t);
    if (i <= 0) return first.v;
    if (i >= keyframes.length) return last.v;
    const curr = keyframes[i];
    const prev = keyframes[i - 1];
    const ease = curr.e ?? linear;
    return interpolate(
      prev.v,
      curr.v,
      ease(invLerp(prev.t, curr.t, t)),
    );
  };
}

export function keynumbers(
  keynumbers: Keyframe<number>[],
): (t: number) => number {
  return keyframes(lerp, keynumbers);
}

function linear(t: number): number {
  return t;
}

function bisectRight(
  array: number[],
  target: number,
  lo: number = 0,
  hi: number = array.length,
): number {
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (target < array[mid]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
