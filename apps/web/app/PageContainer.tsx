"use client";

import * as React from "react";
import {
  ambientSelector,
  blendSelector,
  squareRangeSelector,
  wigglySelector,
} from "inline-effects";
import { InlineEffects, Letters } from "react-inline-effects";

export default function PageContainer() {
  const [text, setText] = React.useState("Inline Effects");
  const [t, setT] = React.useState(0);
  const [manual, setManual] = React.useState(false);
  React.useEffect(() => {
    if (manual) return;
    const id = setInterval(() => setT((performance.now() / 2000) % 1.3), 10);
    return () => clearInterval(id);
  }, [manual]);
  return (
    <div>
      <style jsx>
        {`
          :global([data-inline-effects]) {
            position: relative;
            pointer-events: none;
            white-space: pre-wrap;
          }
          :global([data-inline-effects] > *) {
            display: inline-block;
          }
        `}
      </style>
      <label>
        Text:{" "}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <br />
      <label>
        Time:{" "}
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Manual:{" "}
        <input
          type="checkbox"
          checked={manual}
          onChange={() => setManual(!manual)}
        />
      </label>
      <br />
      <div
        style={{
          outline: "1px solid black",
          margin: "1rem 0",
          padding: "3rem",
          fontSize: "2rem",
          overflow: "hidden",
        }}
      >
        <InlineEffects
          anchorPointGrouping="all"
          effects={[
            {
              selector: blendSelector({
                selectors: [
                  ambientSelector(1 - t),
                  squareRangeSelector({ start: 0, end: 1, offset: t }),
                  wigglySelector({
                    frequency: 10,
                    temporalPhase: t,
                    spatialPhase: t,
                    seq: 0,
                  }),
                ],
              }),
              transformer: () => ({ style }, factor) =>
                style.transform += `translateX(${(factor * 800).toFixed(2)}%)`,
            },
            {
              selector: blendSelector({
                selectors: [
                  ambientSelector(1 - t),
                  squareRangeSelector({ start: 0, end: 1, offset: t }),
                  wigglySelector({
                    frequency: 10,
                    temporalPhase: t,
                    spatialPhase: t,
                    seq: 1,
                  }),
                ],
              }),
              transformer: () => ({ style }, factor) =>
                style.transform += `translateY(${(factor * 200).toFixed(2)}%)`,
            },
            {
              selector: blendSelector({
                selectors: [
                  ambientSelector(1 - t),
                  squareRangeSelector({ start: 0, end: 1, offset: t }),
                  wigglySelector({
                    frequency: 10,
                    temporalPhase: t,
                    spatialPhase: t,
                    seq: 2,
                  }),
                ],
              }),
              transformer: () => ({ style }, factor) =>
                style.transform += `rotateX(${(factor * 180).toFixed(2)}deg)`,
            },
            {
              selector: blendSelector({
                selectors: [
                  ambientSelector(1 - t),
                  squareRangeSelector({ start: 0, end: 1, offset: t }),
                  wigglySelector({
                    frequency: 10,
                    temporalPhase: t,
                    spatialPhase: t,
                    seq: 3,
                  }),
                ],
              }),
              transformer: () => ({ style }, factor) =>
                style.transform += `rotateY(${(factor * 180).toFixed(2)}deg)`,
            },
            {
              selector: blendSelector({
                selectors: [
                  ambientSelector(1 - t),
                  squareRangeSelector({ start: 0, end: 1, offset: t }),
                  wigglySelector({
                    frequency: 10,
                    temporalPhase: t,
                    spatialPhase: t,
                    seq: 4,
                  }),
                ],
              }),
              transformer: () => ({ style }, factor) =>
                style.transform += `rotateZ(${(factor * 180).toFixed(2)}deg)`,
            },
          ]}
        >
          <Letters>{text}</Letters>
        </InlineEffects>
      </div>
    </div>
  );
}
