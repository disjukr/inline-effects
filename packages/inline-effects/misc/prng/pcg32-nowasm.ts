export const PCG32_INITIALIZER_STATE = { value: 0x853c49e6748fea9bn };
export const PCG32_INITIALIZER_INC = { value: 0xda3e39cb94b95bdbn };
export const PCG_DEFAULT_MULTIPLIER_64 = { value: 6364136223846793005n };
export const PCG_DEFAULT_INCREMENT_64 = { value: 1442695040888963407n };

export let state = { value: PCG32_INITIALIZER_STATE.value };
export let inc = { value: PCG32_INITIALIZER_INC.value };

export function pcg32_random(): number {
  return pcg_setseq_64_xsh_rr_32_random_r();
}

export function pcg32_boundedrand(bound: number): number {
  const threshold: number = (-bound % bound) >>> 0;
  while (true) {
    const r: number = pcg_setseq_64_xsh_rr_32_random_r();
    if (r >= threshold) return (r % bound) >>> 0;
  }
}

export function pcg32_srandom(seed: bigint, seq: bigint): void {
  state.value = 0n;
  inc.value = u64((seq << 1n) | 1n);
  pcg_setseq_64_step();
  state.value = u64(state.value + seed);
  pcg_setseq_64_step();
}

export function pcg32s_srandom(seed: bigint): void {
  state.value = 0n;
  inc.value = PCG_DEFAULT_INCREMENT_64.value;
  pcg_setseq_64_step();
  state.value = u64(state.value + seed);
  pcg_setseq_64_step();
}

export function pcg32_advance(delta: bigint): void {
  state.value = pcg_advance_lcg_64(
    state.value,
    u64(delta),
    PCG_DEFAULT_MULTIPLIER_64.value,
    inc.value,
  );
}

function pcg_setseq_64_xsh_rr_32_random_r(): number {
  const oldstate: bigint = state.value;
  pcg_setseq_64_step();
  return pcg_output_xsh_rr_64_32(oldstate);
}

function pcg_setseq_64_step(): void {
  state.value = u64(
    u64(state.value * PCG_DEFAULT_MULTIPLIER_64.value) + inc.value,
  );
}

function pcg_output_xsh_rr_64_32(state: bigint): number {
  return pcg_rotr_32(
    Number(((state >> 18n) ^ state) >> 27n) >>> 0,
    Number(state >> 59n) >>> 0,
  );
}

function pcg_rotr_32(value: number, rot: number): number {
  return ((value >>> rot) | (value << ((-rot) & 31))) >>> 0;
}

function pcg_advance_lcg_64(
  state: bigint,
  delta: bigint,
  cur_mult: bigint,
  cur_plus: bigint,
): bigint {
  let acc_mult: bigint = 1n;
  let acc_plus: bigint = 0n;
  while (delta > 0n) {
    if (delta & 1n) {
      acc_mult = u64(acc_mult * cur_mult);
      acc_plus = u64(u64(acc_plus * cur_mult) + cur_plus);
    }
    cur_plus = u64(u64(cur_mult + 1n) * cur_plus);
    cur_mult = u64(cur_mult * cur_mult);
    delta = delta >> 1n;
  }
  return u64(u64(acc_mult * state) + acc_plus);
}

const mask = (1n << 64n) - 1n;
function u64(value: bigint): bigint {
  return value & mask;
}
