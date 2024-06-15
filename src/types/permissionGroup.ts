import { omitFields } from "@/lib/utils";
import { defaultSchema } from "@/types/default-type";
import { z } from "zod";

export const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  display_name: z.string(),
  description: z.string().nullable(),
  type: z.number(),
  status: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  pivot: z.object({
    role_id: z.number(),
    permission_id: z.number(),
  }),
});

export const permissionGroupSchema = z
  .object({
    he_thong: z.array(permissionSchema),
  })
  .optional();

export type PermissionGroup = z.infer<typeof permissionGroupSchema>;
