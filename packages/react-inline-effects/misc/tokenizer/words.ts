export default function words(text: string): string[] {
  return text.split(/\b/);
}
