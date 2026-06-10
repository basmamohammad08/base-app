import { QueryClient, onlineManager } from "@tanstack/react-query";

import { ApiError } from "@/api";

const ONE_MINUTE = 60_000;
const ONE_DAY = 24 * 60 * ONE_MINUTE;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      staleTime: 5 * ONE_MINUTE,
      gcTime: ONE_DAY,
      retry: (failureCount, error) => {
        if (!onlineManager.isOnline()) {
          return false;
        }

        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false;
        }

        return failureCount < 2;
      },
    },
    mutations: {
      networkMode: "offlineFirst",
      retry: (failureCount) => {
        if (!onlineManager.isOnline()) {
          return false;
        }

        return failureCount < 2;
      },
    },
  },
});

export const PERSIST_MAX_AGE = ONE_DAY;
