import * as React from "react";
import { apply } from "../effects";
import { Effect } from "../effects/type";

export default function useInlineEffects(
  effects: Effect[],
  dep: any,
): React.RefObject<HTMLElement> {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    apply({ container, effects });
  }, [effects, dep]);
  return ref;
}
