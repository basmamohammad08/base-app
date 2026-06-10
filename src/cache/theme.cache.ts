import { CACHE_KEYS } from "./keys";
import { createStorage, STORAGE_IDS } from "./mmkv";
import type { ThemePreference } from "./types";

const storage = createStorage(STORAGE_IDS.THEME);

function isThemePreference(value: string): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export const themeCache = {
  get(): ThemePreference | null {
    const value = storage.getString(CACHE_KEYS.THEME);
    return value && isThemePreference(value) ? value : null;
  },

  set(theme: ThemePreference) {
    storage.set(CACHE_KEYS.THEME, theme);
  },

  clear() {
    storage.remove(CACHE_KEYS.THEME);
  },
};
