export interface Effect {
  selector: Selector;
  transformer: Transformer;
}

export type Selector = (
  elements: HTMLElement[],
) => (index: number) => number /* returns factor. 0~1 */;

export type Transformer = () => (
  element: HTMLElement,
  style: Partial<CSSStyleDeclaration>,
  factor: number,
) => void;
