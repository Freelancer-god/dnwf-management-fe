"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Employee, employeeSchema } from "@/types/employee";
import { Checkbox } from "@/components/ui/checkbox";
import { ZodObject } from "zod";
import { capitalize, mergeArraysById } from "@/lib/utils";
import DeleteEmployeeForm from "@/app/dashboard/employees/_components/delete-employee-form";
import DropDownModalWrapper from "@/components/dropdown/dropdown-modal-wrapper";
import EmployeeForm from "@/app/dashboard/employees/_components/employee-form";
import { READ_FIELDS_EXCLUDE } from "@/lib/constants";

function dynamicColumns(schema: ZodObject<any>) {
  return Object.entries(schema.shape)
    .map(([key, value]) => {
      if (READ_FIELDS_EXCLUDE.includes(key)) return null;

      return {
        id: key,
        accessorKey: key,
        header: ({ column }) => <DataTableColumnHeader column={column} title={capitalize(key)} />,
      };
    })
    .filter((column) => column !== null) as ColumnDef<Employee>[];
}

const defaultColumns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  ...dynamicColumns(employeeSchema),
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id)}>
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropDownModalWrapper label="Edit">
              <EmployeeForm type="Edit" initialData={employee} />
            </DropDownModalWrapper>
            <DropDownModalWrapper label="Delete" className="text-red-500">
              <DeleteEmployeeForm id={employee.id} />
            </DropDownModalWrapper>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Add, or override stuff here by specify id
const updates: ColumnDef<Employee>[] = [
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const employee = row.original;
      return <div>{employee?.role?.name}</div>;
    },
  },
];

export const columns = mergeArraysById(defaultColumns, updates);
