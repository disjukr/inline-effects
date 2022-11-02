"use client";

import * as React from "react";
import { Effect } from "../effects/type";

export interface InlineEffectsProps
  extends React.ComponentPropsWithRef<"span"> {
  effects: Effect[];
  children: React.ReactElement | React.ReactElement[];
}
const InlineEffects: React.FC<InlineEffectsProps> = (
  { effects, children, ...props },
) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
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
  }, [children, effects]);
  return (
    <span
      ref={ref}
      data-inline-effects
      style={{
        position: "relative",
        pointerEvents: "none",
        whiteSpace: "pre-wrap",
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default InlineEffects;
