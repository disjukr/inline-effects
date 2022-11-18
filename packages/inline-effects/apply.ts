import { selectAll } from "./selectors/ambientSelector";
import { Effect } from "./type";

export default function apply<T>(items: T[], effects: Effect<T>[]): void {
  for (const { selector, transformer } of effects) {
    const select = selector ? selector(items) : selectAll;
    const transform = transformer();
    items.forEach((item, index) => {
      const factor = select(index);
      transform(item, factor);
    });
  }
}
