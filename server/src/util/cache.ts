import NodeCache from 'node-cache';

const cache = new NodeCache();

export function get(key: string) {
  return cache.get(key);
}

export function set<T>(key: string, value: T, ttl: number | string) {
  return cache.set(key, value, ttl);
}
