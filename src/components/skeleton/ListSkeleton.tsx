import * as React from "react";
import { View } from "react-native";

import { Skeleton } from "./Skeleton";

type ListSkeletonProps = {
  count?: number;
};

function ListSkeletonItem() {
  return (
    <View className="mb-4 rounded-lg bg-background-surface p-4">
      <Skeleton className="mb-3 h-4 w-3/4" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </View>
  );
}

export function ListSkeleton({ count = 8 }: ListSkeletonProps) {
  return (
    <View className="flex-1 px-4 pt-4">
      {Array.from({ length: count }, (_, index) => (
        <ListSkeletonItem key={index} />
      ))}
    </View>
  );
}
