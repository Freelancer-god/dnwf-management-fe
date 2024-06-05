import { fetcher } from "@/lib/axios";
import { User } from "@/types/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = ["User"];

type GetUserQueryParams = {
  userId: string;
};

type params = {
  page?: number;
  limit?: number;
  q?: string;
};

// Fetch all users
export const fetchUsers = async (params: params) => {
  return await fetcher<User[]>({ url: "/users", method: "GET", params });
};

// Define the hook to get all users
export const useGetUsers = (initialData, params: params) => {
  return useQuery<User[], Error>({
    initialData,
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
  });
};

// Fetch a user by ID
const fetchUserById = async (params: GetUserQueryParams) => {
  return await fetcher<User>({ url: `/users/${params.userId}`, method: "GET" });
};

// Define the hook to get a user by ID
export const useGetUser = (params: GetUserQueryParams) => {
  return useQuery<User, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchUserById(params),
  });
};
