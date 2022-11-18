import { SelectFn, Selector } from "../type";
import { selectAll } from "./ambientSelector";

export type BlendFn = (a: number, b: number) => number;

export interface BlendSelectorConfig {
  selectors: Selector[];
  blend?: BlendFn;
  identity?: SelectFn;
}
export default function blendSelector({
  selectors,
  blend = mul,
  identity = selectAll,
}: BlendSelectorConfig): Selector {
  return (items) => {
    const selectFns = selectors.map((selector) => selector(items));
    return (index) =>
      selectFns.reduce(
        (prev, curr) => blend(prev, curr(index)),
        identity(index),
      );
  };
}

export const add: BlendFn = (a, b) => a + b;
export const mul: BlendFn = (a, b) => a * b;
export const min: BlendFn = Math.min;
export const max: BlendFn = Math.max;
