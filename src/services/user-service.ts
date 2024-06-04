import { fetcher } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = ["User"];

type GetUserQueryParams = {
  userId: string;
};

// Fetch all users
export const fetchUsers = async () => {
  return await fetcher<User[]>({ url: "/users", method: "GET" });
};

// Fetch a user by ID
const fetchUserById = async (params: GetUserQueryParams) => {
  return await fetcher<User>({ url: `/users/${params.userId}`, method: "GET" });
};

// Define the hook to get all users
export const useGetUsers = (initialData) => {
  return useQuery<User[], Error>({
    queryKey: [...QUERY_KEY],
    queryFn: fetchUsers,
    initialData,
  });
};

// Define the hook to get a user by ID
export const useGetUser = (params: GetUserQueryParams) => {
  return useQuery<User, Error>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () => fetchUserById(params),
  });
};
