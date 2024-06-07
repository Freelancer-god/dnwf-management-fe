import axios, { AxiosError, AxiosRequestConfig } from "axios";

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
    const token = localStorage.getItem("next-auth.session-token");
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

export const fetcherForMockApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await apiClientForMockApi.request<T>(config);
  return data;
};

export default apiClient;
