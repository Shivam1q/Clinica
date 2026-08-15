import axios from "axios";
import type { ApiErrorBody } from "@clinica/shared";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (error: unknown) => {
    const axiosError = error as {
      response?: { data?: ApiErrorBody };
      message?: string;
    };
    const message =
      axiosError.response?.data?.error ||
      axiosError.message ||
      "Request failed";
    return Promise.reject(new Error(message));
  },
);

export const apiGet = <T>(path: string): Promise<T> =>
  api.get(path) as Promise<T>;

export const apiPost = <T>(path: string, body?: unknown): Promise<T> =>
  api.post(path, body) as Promise<T>;

export default api;
