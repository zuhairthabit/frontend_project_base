import axios from "axios";

import { API_BASE_URL, API_TIMEOUT_MS } from "@/lib/config";

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        data:
          error.response.data ?? {
            message_key: "ApiError",
            message: "Server ne unexpected response diya.",
            data: {},
          },
      } satisfies ApiError);
    }

    if (error.request) {
      return Promise.reject({
        status: 0,
        data: {
          message_key: "NetworkError",
          message: "Unable to reach server. Try again later.",
          data: {},
        },
      });
    }

    return Promise.reject({
      status: 0,
      data: {
        message_key: "UnknownError",
        message: "Unexpected error occurred.",
        data: {},
      },
    } satisfies ApiError);
  }
);

export type ApiError = {
  status: number;
  data: {
    message_key: string;
    message: string;
    data: unknown;
  };
};

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in (error as Record<string, unknown>)
  );
}

