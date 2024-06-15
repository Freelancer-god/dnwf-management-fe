import { errorHandler } from "@/lib/error-handler";
import { ApiError } from "@/lib/errors";
import axios, { AxiosRequestConfig } from "axios";

export type ApiResponse<Data> = {
  data: {
    data: Data;
    total: number;
  };
  success?: boolean;
  message?: string;
  error?: string;
};

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/`,
});

export const setAuthTokenAsync = async (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

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
    const { data } = await apiClient.request<T>(config);
    const responseData = data as ApiResponse<T>;

    if (!responseData.success) {
      throw new ApiError(responseData.error, responseData);
    }

    return responseData;
  } catch (error) {
    console.log("🚀 ~ fetcher ~ error:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message;
      throw new ApiError(errorMessage, error.response?.data);
    } else {
      throw new ApiError(error.message, error);
    }
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
