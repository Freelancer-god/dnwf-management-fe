import { fetcherForMockApi } from "@/lib/axios";
import { User } from "@/types/user";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = "User";

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
  const res = await fetcherForMockApi<User[]>({ url: "/users", method: "GET", params });
  return res;
};

// Fetch a user by ID
const fetchUserById = async (params: GetUserQueryParams) => {
  const res = await fetcherForMockApi<User>({ url: `/users/${params.userId}`, method: "GET" });
  return res;
};

// Create user
const createUser = async (user: User) => {
  return await fetcherForMockApi<User>({ url: "/users", method: "POST", data: { ...user } });
};

// Delete user
const deleteUser = async (id: string) => {
  return await fetcherForMockApi<User>({ url: `/users/${id}`, method: "DELETE" });
};

// Edit user
const editUser = async (user: User) => {
  return await fetcherForMockApi<User>({
    url: `/users/${user.id}`,
    method: "PUT",
    data: { ...user },
  });
};

// Define the hook to get all users
export const useGetUsers = (initialData: User[], params: params) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
    initialData: () => (params.page === 1 ? initialData : undefined), // first data will be fetched from server side
  });
};

// Define the hook to get a user by ID
export const useGetUser = (params: GetUserQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchUserById(params),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
