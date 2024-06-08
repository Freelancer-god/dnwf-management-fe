import { errorHandler } from "@/lib/error-handler";
import axios, { AxiosRequestConfig } from "axios";

export type ApiResponse<Data> = {
  data: {
    data: Data;
    total: number;
  };
  success?: string;
  message?: string;
  error?: string;
};

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/`,
});

export const setAuthToken = (token): void => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

/**
 * Usage: fetcher<User[]>({ url: "/users", method: "GET" });
 */
export const fetcher = async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.request<T>(config);
    return response.data as ApiResponse<T>;
  } catch (error) {
    const { message: errorMessage } = errorHandler(error);
    throw new Error(errorMessage);
  }
};

const apiClientForMockApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API_URL,
});

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
