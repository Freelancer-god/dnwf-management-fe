import { fetcher } from "@/lib/axios";
import { deepEqual } from "@/lib/utils";
import { Role } from "@/types/role";
import { defaultParams } from "@/types/request-params";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = "Role";

// Fetch all roles
export const fetchInitialRoles = async ({ params = defaultParams, headers }) => {
  const res = await fetcher<Role[]>({
    url: "/roles/search",
    method: "POST",
    data: params,
    headers,
  });
  return res.data;
};

// Fetch all roles
export const fetchRoles = async (params = defaultParams) => {
  const res = await fetcher<Role[]>({
    url: "/roles/search",
    method: "POST",
    data: params,
  });
  return res.data.data;
};

// Fetch a role by ID
const fetchRoleById = async (id: string) => {
  const res = await fetcher<Role>({ url: `/roles/${id}`, method: "GET" });
  return res.data.data;
};

// Create role
const createRole = async (role: Role) => {
  return await fetcher<Role>({ url: "/roles/store", method: "POST", data: role });
};

// Delete role
const deleteRole = async (id: string) => {
  return await fetcher<Role>({ url: `/roles/delete/${id}`, method: "DELETE" });
};

// Edit role
const editRole = async (role: Role) => {
  return await fetcher<Role>({
    url: `/roles/update/${role.id}`,
    method: "PUT",
    data: role,
  });
};

// Define the hook to get all roles
export const useGetRoles = (initialData: Role[], params = defaultParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchRoles(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
    initialData: () => {
      // first data will be fetched from server side
      const isInitialParams = deepEqual(params, defaultParams);
      return isInitialParams ? initialData : undefined;
    },
  });
};

// Define the hook to get a role by ID
export const useGetRole = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchRoleById,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useEditRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
