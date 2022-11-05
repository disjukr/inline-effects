import lerp from "../../misc/math/lerp";
import { Transformer } from "../type";

export interface OpacityTransformerConfig {
  target: number;
  default?: number;
}
export default function opacityTransformer(
  config: OpacityTransformerConfig,
): Transformer {
  const targetValue = config.target;
  const defaultValue = config.default ?? 1;
  return () => ({ style }, factor) => {
    const opacity = Number(style.opacity || defaultValue);
    style.opacity = String(lerp(opacity, targetValue, factor));
  };
}
