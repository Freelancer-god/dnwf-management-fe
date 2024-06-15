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
import { Chihoi, chihoiSchema } from "@/types/chihoi";
import { Checkbox } from "@/components/ui/checkbox";
import { mergeArraysById } from "@/lib/utils";
import DeleteChihoiForm from "@/app/dashboard/chihois/_components/delete-chihoi-form";
import DropDownModalWrapper from "@/components/dropdown/dropdown-modal-wrapper";
import ChihoiForm from "@/app/dashboard/chihois/_components/chihoi-form";
import { dynamicColumns } from "@/components/table/dynamic-column";
import dayjs from "dayjs";
import UploadChihoiForm from "@/app/dashboard/chihois/_components/upload-chihoi-form";

const defaultColumns: ColumnDef<Chihoi>[] = [
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
      const chihoi = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(chihoi.reference)}>
              Copy mã Chi hội
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Chihoi</DropdownMenuItem>
            <DropDownModalWrapper label="Edit">
              <ChihoiForm type="Edit" initialData={chihoi} />
            </DropDownModalWrapper>
            <DropDownModalWrapper label="Upload">
              <UploadChihoiForm id={chihoi.id} />
            </DropDownModalWrapper>
            <DropDownModalWrapper label="Delete" className="text-red-500">
              <DeleteChihoiForm id={chihoi.id} />
            </DropDownModalWrapper>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ...dynamicColumns<Chihoi>(chihoiSchema),
];

// Add, or override stuff here by specify id
const updates: ColumnDef<Chihoi>[] = [
  {
    id: "founding_date",
    accessorFn: (d) => d["founding_date"] && dayjs(d["founding_date"]).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY"),
    // cell:
  },
];

export const columns = mergeArraysById(defaultColumns, updates);
