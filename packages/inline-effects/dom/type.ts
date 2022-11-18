export interface DomItem {
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
