"use client";

import * as React from "react";
import { InlineEffects, Letters } from "react-inline-effects";
import {
  opacityTransformer,
  rampDownRangeSelector,
} from "react-inline-effects/effects";

export default function PageContainer() {
  const [t, setT] = React.useState(0);
  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={t}
        onChange={(e) => setT(Number(e.target.value))}
        style={{ width: "100%" }}
      />
      <InlineEffects
        effects={[
          {
            selector: rampDownRangeSelector({ start: 0, end: 1, offset: t }),
            transformer: opacityTransformer(1, 0),
          },
        ]}
      >
        <Letters>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Letters>
      </InlineEffects>
    </div>
  );
}
