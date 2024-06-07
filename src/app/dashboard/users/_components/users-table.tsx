"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useGetUsers } from "@/services/user-service";
import usePagination from "@/lib/hooks/use-pagination";
import DataTable from "@/components/table/data-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export function UsersTable<TData, TValue>({ columns, initialData }: DataTableProps<TData, TValue>) {
  const { pagination, onPaginationChange } = usePagination();
  const { data, isFetching, isError } = useGetUsers(initialData, {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const table = useReactTable({
    data: data as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: 10,
    state: {
      pagination,
    },
    onPaginationChange,
    manualPagination: true,
    debugTable: process.env.NODE_ENV === "development",
  });

  return <DataTable columns={columns} table={table} isLoading={isFetching} />;
}
