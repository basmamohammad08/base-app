import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  type FlatListProps,
} from "react-native";

type PaginatedFlatListProps<TItem, TPage> = Omit<
  FlatListProps<TItem>,
  "data" | "onEndReached" | "refreshing" | "onRefresh"
> & {
  query: UseInfiniteQueryResult<InfiniteData<TPage>>;
  getItemsFromPage: (page: TPage) => readonly TItem[];
};

export function PaginatedFlatList<TItem, TPage>({
  query,
  getItemsFromPage,
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
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
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
