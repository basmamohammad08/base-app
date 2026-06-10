import { createMMKV, type MMKV } from "react-native-mmkv";

export const STORAGE_IDS = {
  THEME: "theme.storage",
  LANGUAGE: "language.storage",
  USER: "user.storage",
  QUERY: "query.storage",
} as const;

// AES-256 key (max 32 bytes). Protects token at rest on disk; not a substitute for server-side auth.
export const USER_ENCRYPTION_KEY = "base-app-user-storage-key-2026";

export type StorageId = (typeof STORAGE_IDS)[keyof typeof STORAGE_IDS];

export function createStorage(id: StorageId, encryptionKey?: string): MMKV {
  return createMMKV({
    id,
    ...(encryptionKey
      ? { encryptionKey, encryptionType: "AES-256" as const }
      : {}),
  });
}
