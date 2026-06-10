import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { createStorage, STORAGE_IDS } from "@/cache/mmkv";

const mmkv = createStorage(STORAGE_IDS.QUERY);

export const queryPersister = createAsyncStoragePersister({
  storage: {
    getItem: (key) => mmkv.getString(key) ?? null,
    setItem: (key, value) => {
      mmkv.set(key, value);
    },
    removeItem: (key) => {
      mmkv.remove(key);
    },
  },
});
