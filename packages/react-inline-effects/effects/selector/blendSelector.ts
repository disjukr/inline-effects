import { Selector } from "../type";

export type BlendFn = (a: number, b: number) => number;

export default function blendSelector(
  a: Selector,
  b: Selector,
  blend: BlendFn = mul,
): Selector {
  return function (items, time) {
    const selectA = a(items, time);
    const selectB = b(items, time);
    return (index) => blend(selectA(index), selectB(index));
  };
}

export const add: BlendFn = (a, b) => a + b;
export const mul: BlendFn = (a, b) => a * b;
export const min: BlendFn = Math.min;
export const max: BlendFn = Math.max;