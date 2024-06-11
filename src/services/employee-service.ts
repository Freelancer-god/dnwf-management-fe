import { fetcher } from "@/lib/axios";
import { deepEqual } from "@/lib/utils";
import { Employee } from "@/types/employee";
import { defaultParams } from "@/types/request-params";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = "Employee";

// Fetch all employees
export const fetchInitialEmployees = async ({ params = defaultParams, headers }) => {
  const res = await fetcher<Employee[]>({
    url: "/employees/search",
    method: "POST",
    data: params,
    headers,
  });
  return res.data;
};

// Fetch all employees
export const fetchEmployees = async (params = defaultParams) => {
  const res = await fetcher<Employee[]>({
    url: "/employees/search",
    method: "POST",
    data: params,
  });
  return res.data.data;
};

// Fetch a employee by ID
const fetchEmployeeById = async (id: string) => {
  const res = await fetcher<Employee>({ url: `/employees/${id}`, method: "GET" });
  return res.data.data;
};

// Create employee
const createEmployee = async (employee: Employee) => {
  return await fetcher<Employee>({ url: "/employees/store", method: "POST", data: employee });
};

// Delete employee
const deleteEmployee = async (id: string) => {
  return await fetcher<Employee>({ url: `/employees/delete/${id}`, method: "DELETE" });
};

// Edit employee
const editEmployee = async (employee: Employee) => {
  return await fetcher<Employee>({
    url: `/employees/update/${employee.id}`,
    method: "PUT",
    data: employee,
  });
};

// Define the hook to get all employees
export const useGetEmployees = (initialData: Employee[], params = defaultParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchEmployees(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
    initialData: () => {
      // first data will be fetched from server side
      const isInitialParams = deepEqual(params, defaultParams);
      return isInitialParams ? initialData : undefined;
    },
  });
};

// Define the hook to get a employee by ID
export const useGetEmployee = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchEmployeeById,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};

export const useEditEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });
};
