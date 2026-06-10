import { get } from "@/api";
import { apiClient } from "@/api/client";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PostsPage = {
  items: Post[];
  nextPage: number | undefined;
};

const PAGE_SIZE = 10;

export const postsApi = {
  list: () => get<Post[]>("/posts"),
  byId: (id: number) => get<Post>(`/posts/${id}`),
  listPage: async (page: number): Promise<PostsPage> => {
    const response = await apiClient.get<Post[]>("/posts", {
      params: { _page: page, _limit: PAGE_SIZE },
    });
    const total = Number(response.headers["x-total-count"] ?? 0);
    const hasMore = page * PAGE_SIZE < total;

    return {
      items: response.data,
      nextPage: hasMore ? page + 1 : undefined,
    };
  },
};
