import { z } from "zod";
import { defaultSchema } from "@/types/default-type";
import { roleSchema } from "@/types/role";
import { omitFields } from "@/lib/utils";

export const employeeSchema = z
  .object({
    id: z.preprocess((x) => "" + x, z.string()),
    name: z.string(),
    username: z.string(),
    password: z.string().nullable().optional(),
    email: z.string().nullable(),
    phone: z.string().nullable().optional(),
    sex: z.string().nullable().optional(),
    last_login_at: z.coerce.date().optional(),
    role_id: z.string().optional(),
    role: roleSchema, // nested role object
  })
  .extend(defaultSchema.shape);
// .omit({ password: true });

export type Employee = z.infer<typeof employeeSchema>;

// Define the fields to omit in the create form
const formExcludedFields = ["created_at", "updated_at", "role"];

// Create a schema for the create form
export const EmployeeFormSchema = omitFields(employeeSchema, formExcludedFields);
