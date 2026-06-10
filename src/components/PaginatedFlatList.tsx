import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import type { ComponentType } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  type FlatListProps,
} from "react-native";

import { ListSkeleton } from "@/components/skeleton";

type PaginatedFlatListProps<TItem, TPage> = Omit<
  FlatListProps<TItem>,
  "data" | "onEndReached" | "refreshing" | "onRefresh"
> & {
  query: UseInfiniteQueryResult<InfiniteData<TPage>>;
  getItemsFromPage: (page: TPage) => readonly TItem[];
  ListSkeletonComponent?: ComponentType;
};

export function PaginatedFlatList<TItem, TPage>({
  query,
  getItemsFromPage,
  ListSkeletonComponent = ListSkeleton,
  ...flatListProps
}: PaginatedFlatListProps<TItem, TPage>) {
  const {
    data,
    isPending,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = query;

  const items = data?.pages.flatMap(getItemsFromPage) ?? [];

  if (isPending) {
    return <ListSkeletonComponent />;
  }

  return (
    <FlatList
      data={items}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} />
      }
      ListFooterComponent={
        isFetchingNextPage
          ? () => (
              <View className="py-4">
                <ActivityIndicator />
              </View>
            )
          : undefined
      }
      {...flatListProps}
    />
  );
}
