import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const UserProfileSchema = z
  .object({
    id: z.number(),
    reference: z.string(),
    phone: z.string().nullable(),
    name: z.string(),
    username: z.string(),
    password: z.string(),
    sex: z.string().nullable(),
    email: z.string(),
    notes: z.string().nullable(),
    description: z.string().nullable(),
    birth_date: z.string().nullable(),
    last_login_at: z.string(),
    status: z.number(),
    type: z.number(),
    medias: z.array(z.unknown()),
    uuid: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    role: RoleSchema,
    status_name: z.string(),
  })
  .omit({ password: true });

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const LoginSchema = z.object({
  username: z.string().trim().min(1, "Username cần ít nhất 1 ký tự"),
  password: z.string().trim().min(1, "Password cần ít nhất 1 ký tự"),
});

export type LoginType = z.infer<typeof LoginSchema>;
