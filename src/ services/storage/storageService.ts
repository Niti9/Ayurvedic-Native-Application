import { storage } from './mmkv';

export const StorageService = {
  set(key: string, value: unknown): void {
    storage.set(key, JSON.stringify(value));
  },

  get(key: string) {
    const value = storage.getString(key);

    if (!value) return null;

    return JSON.parse(value);
  },

  remove(key: string) {
    storage.remove(key);
  },

  clear() {
    storage.clearAll();
  },
};
