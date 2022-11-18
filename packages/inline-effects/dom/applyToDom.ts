import apply from "../apply";
import { Effect } from "../type";
import { DomItem } from "./type";

export interface ApplyConfig {
  container: HTMLElement;
  effects: Effect<DomItem>[];
  anchorPointGrouping?: AnchorPointGrouping;
}
export type AnchorPointGrouping = "character" | "all";
export default function applyToDom(config: ApplyConfig): void {
  const {
    container,
    effects,
    anchorPointGrouping = "character",
  } = config;
  const elements = Array.from(container.children) as HTMLElement[];
  for (const element of elements) element.removeAttribute("style");
  const items: DomItem[] = elements.map((element) => ({
    element,
    box: {
      x: element.offsetLeft,
      y: element.offsetTop,
      w: element.offsetWidth,
      h: element.offsetHeight,
    },
    style: { transform: "" },
  }));
  if (anchorPointGrouping === "all") handleAnchorPointGroupingAll(items);
  apply(items, effects);
  for (const item of items) Object.assign(item.element.style, item.style);
}

function handleAnchorPointGroupingAll(items: DomItem[]): void {
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
