export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://jsonplaceholder.typicode.com",
  timeout: 30_000,
} as const;
