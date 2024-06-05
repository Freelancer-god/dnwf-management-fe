import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API_URL || process.env.NEXT_PUBLIC_BE_URL,
});

// apiClient.interceptors.request.use(
//   (config) => {
//     // Bearer needed for the backend
//     const token = localStorage.getItem("dadsadada:token");
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

/**
 * Usage: fetcher<User[]>({ url: "/users", method: "GET" });
 */
export const fetcher = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await apiClient.request<T>(config);
  return data;
};

export default apiClient;
