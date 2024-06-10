import { fetcher } from "@/lib/axios";
import { deepEqual } from "@/lib/utils";
import { Chihoi } from "@/types/chihoi";
import { defaultParams } from "@/types/request-params";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = "Club";

// Fetch all clubs
export const fetchInitialChihois = async ({ params = defaultParams, headers }) => {
  const res = await fetcher<Chihoi[]>({
    url: "/clubs/search",
    method: "POST",
    data: params,
    headers,
  });
  return res.data;
};

// Fetch all clubs
export const fetchChihois = async (params = defaultParams) => {
  const res = await fetcher<Chihoi[]>({
    url: "/clubs/search",
    method: "POST",
    data: params,
  });
  return res.data.data;
};

// Fetch a chihoi by ID
const fetchChihoiById = async (id: string) => {
  const res = await fetcher<Chihoi>({ url: `/clubs/${id}`, method: "GET" });
  return res.data.data;
};

// Create chihoi
const createChihoi = async (chihoi: Chihoi) => {
  return await fetcher<Chihoi>({ url: "/clubs/store", method: "POST", data: { ...chihoi } });
};

// Delete chihoi
const deleteChihoi = async (id: string) => {
  return await fetcher<Chihoi>({ url: `/clubs/delete/${id}`, method: "DELETE" });
};

// Edit chihoi
const editChihoi = async (chihoi: Chihoi) => {
  return await fetcher<Chihoi>({
    url: `/clubs/update/${chihoi.id}`,
    method: "PUT",
    data: { ...chihoi },
  });
};

// Define the hook to get all clubs
export const useGetChihois = (initialData: Chihoi[], params = defaultParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchChihois(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
    initialData: () => {
      // first data will be fetched from server side
      const isInitialParams = deepEqual(params, defaultParams);
      return isInitialParams ? initialData : undefined;
    },
  });
};

// Define the hook to get a chihoi by ID
export const useGetChihoi = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchChihoiById,
  });
};

export const useCreateChihoi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChihoi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteChihoi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChihoi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useEditChihoi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editChihoi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
