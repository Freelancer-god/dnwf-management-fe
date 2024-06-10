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
});
// .omit({ password: true });

export type Role = z.infer<typeof roleSchema>;
