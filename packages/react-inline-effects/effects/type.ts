export interface Effect {
  selector: Selector;
  transformer: Transformer;
}

// returns factor. 0~1
export type Selector = (
  items: Item[],
  time: number,
) => (index: number) => number;

export type Transformer = () => (item: Item, factor: number) => void;

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
