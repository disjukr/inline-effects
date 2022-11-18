import { SelectFn, Selector } from "../type";

export default function ambientSelector<T = any>(amount: number): Selector<T> {
  return () => () => amount;
}

export const selectAll: SelectFn = () => 1;
export const selectNone: SelectFn = () => 0;
