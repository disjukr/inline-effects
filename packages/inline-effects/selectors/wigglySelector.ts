import { getPerlinNoiseFn } from "../misc/noise/perlin";
import { Selector } from "../type";

export interface WigglySelectorConfig {
  frequency?: number;
  temporalPhase?: number;
  spatialPhase?: number;
  correlation?: number;
  seed?: number;
  seq?: number;
}
export default function wigglySelector<T = any>({
  frequency = 1,
  temporalPhase = 0,
  spatialPhase = 0,
  correlation = 0,
  seed = 0,
  seq = 0,
}: WigglySelectorConfig): Selector<T> {
  const perlin = getPerlinNoiseFn(seed, seq);
  const co = 1 - correlation;
  return () => (index) =>
    perlin(
      temporalPhase * frequency + 0.5,
      index * co + 0.5,
      spatialPhase * frequency + 0.5,
    );
}
