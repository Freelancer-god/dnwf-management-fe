import { z } from "zod";
import dayjs from "dayjs";

const dateStringSchema = z
  .string()
  .nullable()
  .optional()
  .refine((date) => dayjs(date, "YYYY-MM-DD", true).isValid(), "Invalid date format, expected YYYY-MM-DD")
  .transform((date) => dayjs(date).format("YYYY-MM-DD"));

const roleSchema = z
  .object({
    id: z.preprocess((x) => "" + x, z.string()),
    name: z.string().nullable(),
  })
  .nullable()
  .optional();

export const employeeSchema = z.object({
  id: z.preprocess((x) => "" + x, z.string()),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  birth_date: z.string().nullable().optional(),
  last_login_at: dateStringSchema,
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  role: roleSchema, // nested role object
});
// .omit({ password: true });

export type Employee = z.infer<typeof employeeSchema>;
