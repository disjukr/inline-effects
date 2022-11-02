import lerp from "../../misc/math/lerp";
import { Transformer } from "../type";

export default function opacityTransformer(
  targetValue: number,
  defaultValue: number = 1,
): Transformer {
  return () => (_element, style, factor) => {
    const opacity = Number(style.opacity || defaultValue);
    style.opacity = String(lerp(opacity, targetValue, factor));
  };
}
