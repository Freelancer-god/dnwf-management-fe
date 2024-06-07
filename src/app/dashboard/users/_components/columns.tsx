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
import { User, userSchema } from "@/types/user";
import { Checkbox } from "@/components/ui/checkbox";
import { ZodObject } from "zod";
import { capitalize } from "@/lib/utils";
import DeleteUserForm from "@/app/dashboard/users/_components/delete-user-form";
import DropDownModalWrapper from "@/components/dropdown/dropdown-modal-wrapper";
import UserForm from "@/app/dashboard/users/_components/user-form";

function dynamicColumns(schema: ZodObject<any>) {
  return Object.entries(schema.shape)
    .map(([key, value]) => {
      if (key === "id") return null;

      return {
        accessorKey: key,
        header: ({ column }) => <DataTableColumnHeader column={column} title={capitalize(key)} />,
      };
    })
    .filter((column) => column !== null) as ColumnDef<User>[];
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
  ...dynamicColumns(userSchema),
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropDownModalWrapper label="Edit">
              <UserForm type="Edit" initialData={user} />
            </DropDownModalWrapper>
            <DropDownModalWrapper label="Delete" className="text-red-500">
              <DeleteUserForm id={user.id} />
            </DropDownModalWrapper>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // Override stuff here
];
