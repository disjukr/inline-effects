export default function lerp(s: number, e: number, t: number): number {
  return (e - s) * t + s;
}
