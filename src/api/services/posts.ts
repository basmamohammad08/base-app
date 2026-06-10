import { get } from "@/api";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const postsApi = {
  list: () => get<Post[]>("/posts"),
  byId: (id: number) => get<Post>(`/posts/${id}`),
};
