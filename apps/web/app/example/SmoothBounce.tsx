import { InlineEffects, Letters } from "react-inline-effects";

import { ExampleComponent } from "./type";

const SmoothBounce: ExampleComponent = ({ text, t }) => {
  return (
    <InlineEffects
      effects={[
        {
          selector: ({ length }) => (index) => {
            const d = 0.16;
            const u = (t * 2) - (index / length) - 0.2;
            if (u < d) return t;
            const a = -1 / d;
            const w = Math.PI * 2;
            const s = Math.sin((u - d) * w);
            const e = Math.exp(5 * (u - d));
            return a * (s / e / w);
          },
          transformer: () => ({ style }, factor) => {
            const t = (factor * 200) | 0;
            const s = String(1 - factor);
            const r = factor * 60;
            style.transform = `translateY(${t}%) scaleY(${s}) rotate(${r}deg)`;
            style.opacity = String((1 - factor) ** 3);
            style.letterSpacing = `${-factor}em`;
          },
        },
      ]}
    >
      <Letters>{text}</Letters>
    </InlineEffects>
  );
};
export default SmoothBounce;
