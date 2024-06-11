import { z } from "zod";

export const chihoiSchema = z.object({
  id: z.preprocess((x) => "" + x, z.string()),
  reference: z.preprocess((x) => "" + x, z.string()),
  name: z.string(),
  founding_date: z.coerce.date(),
  leader_name: z.string(),
  phone: z.string().regex(/^\d+$/, {
    message: "Phone number should only contain digits",
  }),
  phone_zalo: z.string().regex(/^\d+$/, {
    message: "Phone number should only contain digits",
  }),
  media: z.union([z.string(), z.number()]).nullable().optional(),
});
// .omit({ password: true });

export type Chihoi = z.infer<typeof chihoiSchema>;
