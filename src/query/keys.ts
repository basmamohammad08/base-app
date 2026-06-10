export const queryKeys = {
  all: ["api"] as const,
  posts: {
    all: () => [...queryKeys.all, "posts"] as const,
    list: () => [...queryKeys.posts.all(), "list"] as const,
    infiniteList: () => [...queryKeys.posts.all(), "infinite"] as const,
    detail: (id: string | number) => [...queryKeys.posts.all(), "detail", id] as const,
  },
  users: {
    all: () => [...queryKeys.all, "users"] as const,
    detail: (id: string | number) => [...queryKeys.users.all(), "detail", id] as const,
  },
} as const;
