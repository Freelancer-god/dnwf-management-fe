import { z } from "zod";
import dayjs from "dayjs";

const dateStringSchema = z
  .string()
  .refine((date) => dayjs(date, "YYYY-MM-DD", true).isValid(), "Invalid date format, expected YYYY-MM-DD")
  .transform((date) => dayjs(date).format("YYYY-MM-DD"));

const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const employeeSchema = z
  .object({
    id: z.string(),
    email: z.string().nullable(), // email can be null
    phone: z.string().nullable(), // phone can be null
    name: z.string(),
    username: z.string(),
    password: z.string(),
    sex: z.string().nullable(), // sex can be null
    birth_date: z.string().nullable(), // birth_date can be null
    last_login_at: dateStringSchema,
    created_at: z.string(),
    updated_at: z.string(),
    role: roleSchema, // nested role object
  })
  .omit({ password: true });

export type Employee = z.infer<typeof employeeSchema>;
