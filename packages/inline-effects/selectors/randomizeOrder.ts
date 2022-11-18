import shuffle from "../misc/array/shuffle";
import { getRandomFn } from "../misc/prng/lfsr113";
import { Selector } from "../type";

export default function randomizeOrder(selector: Selector, seed = 0): Selector {
  return function (items) {
    const indices = shuffle(
      Array.from(Array(items.length).keys()),
      getRandomFn(seed),
    );
    const select = selector(items);
    return (index) => select(indices[index]);
  };
}
