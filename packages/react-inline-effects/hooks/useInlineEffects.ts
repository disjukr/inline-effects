import * as React from "react";
import type { AnchorPointGrouping, DomItem, Effect } from "inline-effects";
import { applyToDom } from "inline-effects";

export interface UseInlineEffectsConfig {
  effects: Effect<DomItem>[];
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
    applyToDom({ container, effects, anchorPointGrouping });
  }, [effects, anchorPointGrouping, ...deps]);
  return ref;
}
