import type { AxiosError } from "axios";

export type ApiErrorBody = {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly body?: ApiErrorBody;

  constructor(
    message: string,
    status: number,
    options?: { code?: string; body?: ApiErrorBody; cause?: unknown },
  ) {
    super(message, { cause: options?.cause });
    this.name = "ApiError";
    this.status = status;
    this.code = options?.code;
    this.body = options?.body;
  }

  static fromAxiosError(error: AxiosError<ApiErrorBody>): ApiError {
    if (error.response) {
      const { status, data } = error.response;
      return new ApiError(data?.message ?? error.message, status, {
        code: data?.code,
        body: data,
        cause: error,
      });
    }

    if (error.request) {
      return new ApiError("Network request failed", 0, { cause: error });
    }

    return new ApiError(error.message, 0, { cause: error });
  }
}
