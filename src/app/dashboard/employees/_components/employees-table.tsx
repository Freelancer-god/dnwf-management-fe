"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useGetEmployees } from "@/services/employee-service";
import usePagination from "@/lib/hooks/use-pagination";
import DataTable from "@/components/table/data-table";
import { Employee } from "@/types/employee";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: Employee[];
  total?: number;
}

export function EmployeesTable<TData, TValue>({ columns, initialData, total }: DataTableProps<TData, TValue>) {
  const { pagination, onPaginationChange } = usePagination();
  const { data, isFetching, isError } = useGetEmployees(initialData, {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const table = useReactTable({
    data: data as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: total || 0,
    state: {
      pagination,
    },
    onPaginationChange,
    manualPagination: true,
    debugTable: process.env.NODE_ENV === "development",
  });

  return <DataTable columns={columns} table={table} isLoading={isFetching} />;
}
