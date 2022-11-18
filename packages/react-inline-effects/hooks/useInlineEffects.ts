import * as React from "react";
import type { AnchorPointGrouping, Effect } from "inline-effects";
import { apply } from "inline-effects";

export interface UseInlineEffectsConfig {
  effects: Effect[];
  anchorPointGrouping?: AnchorPointGrouping;
}
export default function useInlineEffects({
  effects,
  anchorPointGrouping,
}: UseInlineEffectsConfig, deps: any[]): React.RefObject<HTMLElement> {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;
    apply({ container, effects, anchorPointGrouping });
  }, [effects, anchorPointGrouping, ...deps]);
  return ref;
}
