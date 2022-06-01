export const obj2query = (data: any = {}): string =>
  Object.entries(data)
    .filter(([_key, val]) => val !== undefined && val !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
