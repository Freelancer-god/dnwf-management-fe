import { fetcherForMockApi } from "@/lib/axios";
import { User } from "@/types/user";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

// Define the hook to get all users
export const useGetUsers = (initialData, params: params) => {
  return useQuery<User[], Error>({
    initialData,
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
    refetchOnMount: false,
  });
};

// Fetch a user by ID
const fetchUserById = async (params: GetUserQueryParams) => {
  const res = await fetcherForMockApi<User>({ url: `/users/${params.userId}`, method: "GET" });
  return res;
};

// Define the hook to get a user by ID
export const useGetUser = (params: GetUserQueryParams) => {
  return useQuery<User, Error>({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchUserById(params),
  });
};

// Create user
const createUser = async (user: User) => {
  return await fetcherForMockApi<User[]>({ url: "/users", method: "POST", data: { ...user } });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Delete user
const deleteUser = async (id: string) => {
  return await fetcherForMockApi<User[]>({ url: `/users/${id}`, method: "DELETE" });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Edit user
const editUser = async (user: User) => {
  return await fetcherForMockApi<User[]>({
    url: `/users/${user.id}`,
    method: "PUT",
    data: { ...user },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUser,
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
