import { useQuery } from "@tanstack/react-query";

import { postsApi } from "@/api/services/posts";
import { queryKeys } from "@/query/keys";

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.list(),
    queryFn: postsApi.list,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postsApi.byId(id),
    enabled: id > 0,
  });
}
