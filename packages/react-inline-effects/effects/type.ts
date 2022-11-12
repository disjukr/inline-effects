export interface Effect {
  selector?: Selector;
  transformer: Transformer;
}

export type Selector = (
  items: Item[],
  time: number,
) => SelectFn;

// returns factor. 0~1
export type SelectFn = (index: number) => number;

export type Transformer = () => TransformFn;

export type TransformFn = (item: Item, factor: number) => void;

export interface Item {
  element: HTMLElement;
  box: Box;
  style: Partial<CSSStyleDeclaration>;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
