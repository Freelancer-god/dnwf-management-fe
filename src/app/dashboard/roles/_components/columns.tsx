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
import { Role, roleSchema } from "@/types/role";
import { Checkbox } from "@/components/ui/checkbox";
import { mergeArraysById, snakeToHumanReadable } from "@/lib/utils";
import DeleteRoleForm from "@/app/dashboard/roles/_components/delete-role-form";
import DropDownModalWrapper from "@/components/dropdown/dropdown-modal-wrapper";
import RoleForm from "@/app/dashboard/roles/_components/role-form";
import { dynamicColumns } from "@/components/table/dynamic-column";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { PermissionGroup } from "@/types/permissionGroup";

const defaultColumns: ColumnDef<Role>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id)}>Copy Role ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Role</DropdownMenuItem>
            <DropDownModalWrapper label="Edit">
              <RoleForm type="Edit" initialData={role} />
            </DropDownModalWrapper>
            <DropDownModalWrapper label="Delete" className="text-red-500">
              <DeleteRoleForm id={role.id} />
            </DropDownModalWrapper>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ...dynamicColumns<Role>(roleSchema),
];

// Add, or override stuff here by specify id
const updates: ColumnDef<Role>[] = [
  {
    id: "permission_groups",
    accessorKey: "permission_groups",
    header: ({ column }) => <DataTableColumnHeader column={column} title={snakeToHumanReadable("Quyền")} />,
    cell: ({ row }) => {
      const role = row.original;
      const permissionGroups = role.permission_groups;
      return (
        permissionGroups &&
        permissionGroups.he_thong &&
        permissionGroups.he_thong.length > 0 &&
        permissionGroups?.he_thong?.map((permission) => {
          return <div key={permission.id}>{permission.display_name}</div>;
        })
      );
    },
  },
];

export const columns = mergeArraysById(defaultColumns, updates);
