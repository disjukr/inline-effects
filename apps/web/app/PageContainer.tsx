"use client";

import * as React from "react";
import Wiggly from "./example/Wiggly";

function getT(now: number, duration: number, rest: number): number {
  return (now % (duration + rest)) / duration;
}

export default function PageContainer() {
  const [text, setText] = React.useState("Inline Effects");
  const [t, setT] = React.useState(0);
  const [duration, setDuration] = React.useState(3);
  const [manual, setManual] = React.useState(false);
  React.useEffect(() => {
    if (manual) return;
    const id = setInterval(
      () => setT(getT(performance.now(), duration * 1000, 600)),
      10,
    );
    return () => clearInterval(id);
  }, [manual, duration]);
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
        Duration:{" "}
        <input
          type="number"
          min="1"
          max="60"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />s
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
        <Wiggly text={text} t={t} />
      </div>
    </div>
  );
}
