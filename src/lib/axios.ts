import { errorHandler } from "@/lib/error-handler";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export type ApiResponse<Data> = {
  data: Data;
  success?: string;
  message?: string;
  error?: string;
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    // Bearer needed for the backend
    const token = Cookies().get("next-auth.session-token");
    console.log("🚀 ~ token:", token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Usage: fetcher<User[]>({ url: "/users", method: "GET" });
 */
export const fetcher = async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  const response = await apiClient.request<T>(config);
  return response.data as ApiResponse<T>;
};

const apiClientForMockApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API_URL,
});

apiClientForMockApi.interceptors.request.use(
  (config) => {
    // Bearer needed for the backend
    const token = Cookies.get("next-auth.session-token");
    console.log("🚀 ~ token:", token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetcherForMockApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await apiClientForMockApi.request<T>(config);
    return data;
  } catch (error) {
    const { message: errorMessage } = errorHandler(error);
    throw new Error(errorMessage);
  }
};

export default apiClient;
