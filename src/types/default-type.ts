import { z } from "zod";

// Define the common schema fragment
export const defaultSchema = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  media: z.union([z.string(), z.number()]).optional(),
});
