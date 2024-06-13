import { omitFields } from "@/lib/utils";
import { defaultSchema } from "@/types/default-type";
import { permissionGroupSchema } from "@/types/permissionGroup";
import { z } from "zod";

export enum PermissionID {
  "view-employee" = "1",
  "create-employee" = "2",
  "update-employee" = "3",
  "delete-employee" = "4",
  "export-employee" = "5",
  "view-role" = "6",
  "create-role" = "7",
  "update-role" = "8",
  "delete-role" = "9",
}

export const roleSchema = z
  .object({
    id: z.preprocess((x) => "" + x, z.string()),
    name: z.string(),
    display_name: z.string(),
    description: z.string().optional(),
    permission_ids: z.any(),
    permission_groups: permissionGroupSchema,
    // type: z.objec({ id: 1, value: "success" }, { id: 2, value: "pending" }, { id: 3, value: "failed" }),
  })
  .extend(defaultSchema.shape);

export type Role = z.infer<typeof roleSchema>;

// Define the fields to omit in the create form
const createFormExcludedFields = ["created_at", "updated_at"];

// Create a schema for the create form
export const createRoleFormSchema = omitFields(roleSchema, createFormExcludedFields);
