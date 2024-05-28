- By using z.lazy, you allow MenuItemSchema to be used within its own definition

```js
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

// Infer from the Zod schema above will convert to this Typescript interface
// interface MenuItem {
//     href: string;
//     label: string;
//     icon: ReactNode;
//     subItems?: MenuItem[];
// }
```
