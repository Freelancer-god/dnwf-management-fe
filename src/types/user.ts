import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  amount: z.string(),
  status: z.enum(["success", "pending", "failed"]), // Assuming status can have multiple values
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
