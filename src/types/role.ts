import { z } from "zod";

export const roleSchema = z.object({
  id: z.preprocess((x) => "" + x, z.string()),
  name: z.string(),
  founding_date: z.coerce.date().optional(),
  leader_name: z.string().optional(),
  phone: z.string().regex(/^\d+$/, {
    message: "Phone number should only contain digits",
  }),
  phone_zalo: z
    .string()
    .regex(/^\d+$/, {
      message: "Phone number should only contain digits",
    })
    .optional(),
  media: z.union([z.string(), z.number()]).optional(),

  // name: z.string(),
  // username: z.string(),
  // password: z.string().nullable(),
  // email: z.string().nullable(),
  // phone: z.string().nullable().optional(),
  // sex: z.string().nullable().optional(),
  // birth_date: z.coerce.date().optional(),
  // last_login_at: z.coerce.date().optional(),
  // created_at: z.coerce.date().optional(),
  // updated_at: z.coerce.date().optional(),
});
// .omit({ password: true });

export type Role = z.infer<typeof roleSchema>;
