import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  amount: z.number(),
  status: z.enum(["success", "pending", "failed"]), // Assuming status can have multiple values
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
