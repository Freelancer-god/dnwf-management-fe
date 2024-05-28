import { z } from "zod";

export const MenuItemSchema = z.lazy(() =>
  z.object({
    href: z.string(),
    label: z.string(),
    icon: z.any(), // Handle ReactNode using z.any()
    subItems: z.array(MenuItemSchema).optional(),
  }),
);

export type MenuItem = z.infer<typeof MenuItemSchema>;
