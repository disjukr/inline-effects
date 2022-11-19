import { squareRangeSelector } from "inline-effects";
import { InlineEffects, Letters } from "react-inline-effects";

import { ExampleComponent } from "./type";

const Range: ExampleComponent = ({ text, t }) => {
  return (
    <InlineEffects
      effects={[
        {
          selector: squareRangeSelector({ start: -0.05, end: 1, offset: t }),
          transformer: () => ({ style }, factor) =>
            style.transform = `scale(${(1 + factor * 0.5).toFixed(2)})`,
        },
        {
          selector: squareRangeSelector({ start: 0, end: t }),
          transformer: () => ({ style }, factor) =>
            style.opacity = factor.toFixed(2),
        },
      ]}
    >
      <Letters>{text}</Letters>
    </InlineEffects>
  );
};
export default Range;
