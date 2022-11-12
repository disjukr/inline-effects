import {
  pcg32_advance,
  PCG32_INITIALIZER_STATE,
  pcg32_random,
  pcg32s_srandom,
  state,
} from "@disjukr/pcg32";

export function reset(): void {
  state.value = PCG32_INITIALIZER_STATE.value;
}

export function srandom(seed: number): void {
  pcg32s_srandom(BigInt(seed));
}

// code from: https://github.com/alisey/pcg32/blob/e7848d27e1ebf60db5200d05585162a741944bf4/src/index.js#L29-L53
export function random(): number {
  return (
    (pcg32_random() & 0x1fffff) * 0x100000000 +
    pcg32_random()
  ) * 1.1102230246251565e-16;
}

export function advance(step: number): void {
  pcg32_advance(BigInt(step << 1));
}
