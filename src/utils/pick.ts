export function pick<T = any>(arr: T[] = []): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
