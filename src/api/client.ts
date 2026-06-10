import { userCache } from "@/cache";
import axios, { type AxiosError } from "axios";

import { API_CONFIG } from "./config";
import { ApiError, type ApiErrorBody } from "./types";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = userCache.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    throw ApiError.fromAxiosError(error);
  },
);
