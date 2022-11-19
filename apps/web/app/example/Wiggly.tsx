import {
  ambientSelector,
  blendSelector,
  squareRangeSelector,
  wigglySelector,
} from "inline-effects";
import { InlineEffects, Letters } from "react-inline-effects";

import { ExampleComponent } from "./type";

const Wiggly: ExampleComponent = ({ text, t }) => {
  return (
    <InlineEffects
      anchorPointGrouping="all"
      effects={[
        {
          selector: getSelector(t, 0),
          transformer: () => ({ style }, factor) =>
            style.transform += `translateX(${(factor * 800) | 0}%)`,
        },
        {
          selector: getSelector(t, 1),
          transformer: () => ({ style }, factor) =>
            style.transform += `translateY(${(factor * 200) | 0}%)`,
        },
        {
          selector: getSelector(t, 2),
          transformer: () => ({ style }, factor) =>
            style.transform += `rotateX(${(factor * 180) | 0}deg)`,
        },
        {
          selector: getSelector(t, 3),
          transformer: () => ({ style }, factor) =>
            style.transform += `rotateY(${(factor * 180) | 0}deg)`,
        },
        {
          selector: getSelector(t, 4),
          transformer: () => ({ style }, factor) =>
            style.transform += `rotateZ(${(factor * 180) | 0}deg)`,
        },
      ]}
    >
      <Letters>{text}</Letters>
    </InlineEffects>
  );
};
export default Wiggly;

function getSelector(t: number, seq: number) {
  return blendSelector({
    selectors: [
      ambientSelector(1 - t),
      squareRangeSelector({ start: 0, end: 1, offset: t }),
      wigglySelector({
        frequency: 10,
        temporalPhase: t,
        spatialPhase: t,
        seq,
      }),
    ],
  });
}
