import { getPerlinNoiseFn } from "../../misc/noise/perlin";
import { Selector } from "../type";

export interface WigglySelectorConfig {
  frequency?: number;
  temporalPhase?: number;
  spatialPhase?: number;
  correlation?: number;
  seed?: number;
}
export default function wigglySelector({
  frequency = 1,
  temporalPhase = 0,
  spatialPhase = 0,
  correlation = 0,
  seed = 0,
}: WigglySelectorConfig): Selector {
  const perlin = getPerlinNoiseFn(seed);
  const co = 1 - correlation;
  return () => (index) =>
    perlin(
      temporalPhase * frequency + 0.5,
      index * co + 0.5,
      spatialPhase + 0.5,
    );
}
