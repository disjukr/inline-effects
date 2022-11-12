import selectAll from "./selector/selectAll";
import { Effect, Item } from "./type";

export interface ApplyConfig {
  container: HTMLElement;
  effects: Effect[];
  time?: number;
  anchorPointGrouping?: AnchorPointGrouping;
}
export type AnchorPointGrouping = "character" | "all";
export default function apply(config: ApplyConfig): void {
  const {
    container,
    effects,
    time = 0,
    anchorPointGrouping = "character",
  } = config;
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
  if (anchorPointGrouping === "all") handleAnchorPointGroupingAll(items);
  for (const { selector, transformer } of effects) {
    const select = selector ? selector(items, time) : selectAll;
    const transform = transformer();
    items.forEach((item, index) => {
      const factor = select(index);
      transform(item, factor);
    });
  }
  for (const item of items) Object.assign(item.element.style, item.style);
}

function handleAnchorPointGroupingAll(items: Item[]): void {
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const { box: { x: left, y: top, w, h } } of items) {
    const [right, bottom] = [left + w, top + h];
    minX = Math.min(minX, left);
    minY = Math.min(minY, top);
    maxX = Math.max(maxX, right);
    maxY = Math.max(maxY, bottom);
  }
  const [centerX, centerY] = [(minX + maxX) >> 1, (minY + maxY) >> 1];
  for (const { box: { x: left, y: top }, style } of items) {
    const [originX, originY] = [(centerX - left) | 0, (centerY - top) | 0];
    style.transformOrigin = `${originX}px ${originY}px`;
  }
}
