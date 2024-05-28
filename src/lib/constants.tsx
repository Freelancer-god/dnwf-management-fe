import { MenuItem } from "@/types/menu-item";
import { GroupIcon, Home, User } from "lucide-react";

export const SIDEBAR_ITEMS: MenuItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: "#",
    label: "users",
    icon: <User className="h-4 w-4" />,
    subItems: [
      {
        href: "/dashboard/users",
        label: "user list",
        icon: <User className="h-4 w-4" />,
      },
      {
        href: "/dashboard/agents",
        label: "agents",
        icon: <GroupIcon className="h-4 w-4" />,
      },
    ],
  },
];
