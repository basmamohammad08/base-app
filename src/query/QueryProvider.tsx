import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as React from "react";

import { PERSIST_MAX_AGE, queryClient } from "./client";
import { setupOnlineManager } from "./network";
import { queryPersister } from "./persister";

setupOnlineManager();

type Props = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: Props) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: PERSIST_MAX_AGE,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.state.status === "success",
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
