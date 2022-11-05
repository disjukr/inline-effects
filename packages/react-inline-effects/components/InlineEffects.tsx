"use client";

import * as React from "react";
import { Effect } from "../effects/type";
import useInlineEffects from "../hooks/useInlineEffects";

export interface InlineEffectsProps
  extends React.ComponentPropsWithRef<"span"> {
  effects: Effect[];
  children: React.ReactElement | React.ReactElement[];
}
const InlineEffects: React.FC<InlineEffectsProps> = (
  { effects, children, ...props },
) => {
  const ref = useInlineEffects(effects, children);
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
