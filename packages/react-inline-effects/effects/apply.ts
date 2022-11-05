import { Effect, Item } from "./type";

export interface ApplyConfig {
  container: HTMLElement;
  effects: Effect[];
}
export default function apply(config: ApplyConfig): void {
  const { container, effects } = config;
  const elements = Array.from(container.children) as HTMLElement[];
  for (const element of elements) element.removeAttribute("style");
  const items: Item[] = elements.map((element) => ({
    element,
    box: {
      x: element.offsetLeft,
      y: element.offsetTop,
      w: element.offsetWidth,
      h: element.offsetHeight,
    },
    style: {},
  }));
  for (const { selector, transformer } of effects) {
    const select = selector(items);
    const transform = transformer();
    items.forEach((item, index) => {
      const factor = select(index);
      transform(item, factor);
    });
  }
  for (const item of items) Object.assign(item.element.style, item.style);
}
