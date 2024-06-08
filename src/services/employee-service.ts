import { fetcher } from "@/lib/axios";
import { Employee } from "@/types/employee";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define the query keys
const QUERY_KEY = "Employee";

type GetEmployeeQueryParams = {
  employeeId: string;
};

type params = {
  page?: number;
  limit?: number;
  order_by?: string;
  sort?: string;
  filter: object;
  term?: string;
};

// Fetch all employees
export const fetchInitialEmployees = async (params: params, headers?: any) => {
  const res = await fetcher<Employee[]>({
    url: "/employees/search",
    method: "POST",
    data: params,
    headers,
  });
  return res.data;
};

// Fetch all employees
export const fetchEmployees = async (params: params) => {
  const res = await fetcher<Employee[]>({
    url: "/employees/search",
    method: "POST",
    data: params,
  });
  return res.data.data;
};

// Fetch a employee by ID
const fetchEmployeeById = async (params: GetEmployeeQueryParams) => {
  const res = await fetcher<Employee>({ url: `/employees/${params.employeeId}`, method: "GET" });
  return res.data.data;
};

// Create employee
const createEmployee = async (employee: Employee) => {
  return await fetcher<Employee>({ url: "/employees/store", method: "POST", data: { ...employee } });
};

// Delete employee
const deleteEmployee = async (id: string) => {
  return await fetcher<Employee>({ url: `/employees/delete/${id}`, method: "DELETE" });
};

// Edit employee
const editEmployee = async (employee: Employee) => {
  return await fetcher<Employee>({
    url: `/employees/update/${employee.id}`,
    method: "POST",
    data: { ...employee },
  });
};

// Define the hook to get all employees
export const useGetEmployees = (initialData: Employee[], params: params) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchEmployees(params),
    placeholderData: keepPreviousData, // The data from the last successful fetch is available while new data is being requested
    initialData: () => (params.page === 1 ? initialData : undefined), // first data will be fetched from server side
  });
};

// Define the hook to get a employee by ID
export const useGetEmployee = (params: GetEmployeeQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => fetchEmployeeById(params),
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
