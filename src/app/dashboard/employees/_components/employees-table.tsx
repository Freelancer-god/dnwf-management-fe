"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useGetEmployees } from "@/services/employee-service";
import usePagination from "@/lib/hooks/use-pagination";
import DataTable from "@/components/table/data-table";
import { Employee } from "@/types/employee";
import useSorting from "@/lib/hooks/use-sorting";
import useColumnsFilter from "@/lib/hooks/use-column-filters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: Employee[];
  total?: number;
}

export function EmployeesTable<TData, TValue>({ columns, initialData, total }: DataTableProps<TData, TValue>) {
  const { pagination, onPaginationChange } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();
  const { columnFilters, onColumnFiltersChange, filterObject } = useColumnsFilter();

  const { data, isFetching } = useGetEmployees(initialData, {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sort: order,
    order_by: field,
    filter: filterObject,
  });

  const table = useReactTable({
    data: data as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: total || 0,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    debugTable: process.env.NODE_ENV === "development",
  });

  return <DataTable columns={columns} table={table} isLoading={isFetching} filterField="email" />;
}
