"use client";

import * as React from "react";
import { AnchorPointGrouping } from "../effects";
import { Effect } from "../effects/type";
import useInlineEffects from "../hooks/useInlineEffects";

export interface InlineEffectsProps
  extends React.ComponentPropsWithRef<"span"> {
  effects: Effect[];
  children: React.ReactElement | React.ReactElement[];
  anchorPointGrouping?: AnchorPointGrouping;
}
const InlineEffects: React.FC<InlineEffectsProps> = (
  { effects, children, anchorPointGrouping, ...props },
) => {
  const ref = useInlineEffects({ effects, anchorPointGrouping }, [children]);
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
