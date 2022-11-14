import { SelectFn, Selector } from "../type";

export default function ambientSelector(amount: number): Selector {
  return () => () => amount;
}

export const selectAll: SelectFn = () => 1;
export const selectNone: SelectFn = () => 0;
