import { z } from "zod";
import dayjs from "dayjs";

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
  password: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable().optional(),
  sex: z.string().nullable().optional(),
  birth_date: z.coerce.date().optional(),
  last_login_at: z.coerce.date().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  role: roleSchema, // nested role object
});
// .omit({ password: true });

export type Employee = z.infer<typeof employeeSchema>;
