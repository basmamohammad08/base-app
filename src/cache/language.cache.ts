import { CACHE_KEYS } from "./keys";
import { createStorage, STORAGE_IDS } from "./mmkv";
import type { CachedLocale } from "./types";

const storage = createStorage(STORAGE_IDS.LANGUAGE);

function isCachedLocale(value: string): value is CachedLocale {
  return value === "en" || value === "ar";
}

export const languageCache = {
  get(): CachedLocale | null {
    const value = storage.getString(CACHE_KEYS.LANGUAGE);
    return value && isCachedLocale(value) ? value : null;
  },

  set(locale: CachedLocale) {
    storage.set(CACHE_KEYS.LANGUAGE, locale);
  },

  clear() {
    storage.remove(CACHE_KEYS.LANGUAGE);
  },
};
