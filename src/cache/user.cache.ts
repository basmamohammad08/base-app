import { CACHE_KEYS } from "./keys";
import { createStorage, STORAGE_IDS, USER_ENCRYPTION_KEY } from "./mmkv";
import type { CachedUser } from "./types";

const storage = createStorage(STORAGE_IDS.USER, USER_ENCRYPTION_KEY);

export const userCache = {
  getUser(): CachedUser | null {
    const raw = storage.getString(CACHE_KEYS.USER);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as CachedUser;
    } catch {
      return null;
    }
  },

  setUser(user: CachedUser) {
    storage.set(CACHE_KEYS.USER, JSON.stringify(user));
  },

  getToken(): string | null {
    return storage.getString(CACHE_KEYS.TOKEN) ?? null;
  },

  setToken(token: string) {
    storage.set(CACHE_KEYS.TOKEN, token);
  },

  setSession(user: CachedUser, token: string) {
    storage.set(CACHE_KEYS.USER, JSON.stringify(user));
    storage.set(CACHE_KEYS.TOKEN, token);
  },

  clear() {
    storage.remove(CACHE_KEYS.USER);
    storage.remove(CACHE_KEYS.TOKEN);
  },
};
