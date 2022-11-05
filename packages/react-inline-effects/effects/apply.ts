import { Effect } from "./type";

export default function apply(container: HTMLElement, effects: Effect[]): void {
  const elements = Array.from(container.children) as HTMLElement[];
  const styles: Partial<CSSStyleDeclaration>[] = elements.map(() => ({}));
  for (const element of elements) element.removeAttribute("style");
  for (const { selector, transformer } of effects) {
    const select = selector(elements);
    const transform = transformer();
    elements.forEach((element, index) => {
      const style = styles[index];
      const factor = select(index);
      transform(element, style, factor);
    });
  }
  elements.forEach((element, index) =>
    Object.assign(element.style, styles[index])
  );
}
