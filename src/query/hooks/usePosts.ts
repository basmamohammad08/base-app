import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { postsApi } from "@/api/services/posts";
import { queryKeys } from "@/query/keys";

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.list(),
    queryFn: postsApi.list,
  });
}

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.infiniteList(),
    queryFn: ({ pageParam }) => postsApi.listPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postsApi.byId(id),
    enabled: id > 0,
  });
}
