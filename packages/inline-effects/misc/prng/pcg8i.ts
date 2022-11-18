export const PCG8_INITIALIZER_STATE = 0x9b;
export const PCG8_INITIALIZER_INC = 0xdb;
export const PCG_DEFAULT_MULTIPLIER_8 = 141;
export const PCG_DEFAULT_INCREMENT_8 = 77;

export interface pcg8i_random_t {
  state: number;
  inc: number;
}

export function pcg8i_random_r(rng: pcg8i_random_t): number {
  return pcg_setseq_8_rxs_m_xs_8_random_r(rng);
}

export function pcg8i_boundedrand_r(
  rng: pcg8i_random_t,
  bound: number,
): number {
  const threshold: number = u8(-bound) % bound;
  while (true) {
    const r: number = pcg_setseq_8_rxs_m_xs_8_random_r(rng);
    if (r >= threshold) return r % bound;
  }
}

export function pcg8i_srandom_r(
  rng: pcg8i_random_t,
  seed: number,
  seq: number,
): void {
  rng.state = 0;
  rng.inc = u8((seq << 1) | 1);
  pcg_setseq_8_step_r(rng);
  rng.state = u8(rng.state + seed);
  pcg_setseq_8_step_r(rng);
}

export function pcg8si_srandom_r(rng: pcg8i_random_t, seed: number): void {
  rng.state = 0;
  rng.inc = PCG_DEFAULT_INCREMENT_8;
  pcg_setseq_8_step_r(rng);
  rng.state = u8(rng.state + seed);
  pcg_setseq_8_step_r(rng);
}

export function pcg8i_advance_r(rng: pcg8i_random_t, delta: number): void {
  rng.state = pcg_advance_lcg_8(
    rng.state,
    u8(delta),
    PCG_DEFAULT_MULTIPLIER_8,
    rng.inc,
  );
}

function pcg_setseq_8_rxs_m_xs_8_random_r(rng: pcg8i_random_t): number {
  const oldstate: number = rng.state;
  pcg_setseq_8_step_r(rng);
  return pcg_output_rxs_m_xs_8_8(oldstate);
}

function pcg_setseq_8_step_r(rng: pcg8i_random_t): void {
  rng.state = u8(u8(rng.state * PCG_DEFAULT_MULTIPLIER_8) + rng.inc);
}

function pcg_output_rxs_m_xs_8_8(state: number): number {
  const word: number = u8(((state >> ((state >> 6) + 2)) ^ state) * 217);
  return (word >> 6) ^ word;
}

function pcg_advance_lcg_8(
  state: number,
  delta: number,
  cur_mult: number,
  cur_plus: number,
): number {
  let acc_mult: number = 1;
  let acc_plus: number = 0;
  while (delta > 0) {
    if (delta & 1) {
      acc_mult = u8(acc_mult * cur_mult);
      acc_plus = u8(u8(acc_plus * cur_mult) + cur_plus);
    }
    cur_plus = u8(u8(cur_mult + 1) * cur_plus);
    cur_mult = u8(cur_mult * cur_mult);
    delta = delta >> 1;
  }
  return u8(u8(acc_mult * state) + acc_plus);
}

const mask = 0xff;
function u8(value: number): number {
  return value & mask;
}
