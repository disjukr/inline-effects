import shuffle from "../../misc/array/shuffle";
import { getRandomFn } from "../../misc/prng/lfsr113";
import { Selector } from "../type";

export default function randomizeOrder(selector: Selector, seed = 0): Selector {
  return function (elements) {
    const indices = shuffle(
      Array.from(Array(elements.length).keys()),
      getRandomFn(seed),
    );
    const select = selector(elements);
    return (index) => select(indices[index]);
  };
}
