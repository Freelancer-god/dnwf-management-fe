import { MenuItem } from "@/types/menu-item";
import { GroupIcon, Home, HomeIcon, User, Users, Users2 } from "lucide-react";

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
  {
    href: "/dashboard/employees",
    label: "Employee",
    icon: <User className="h-4 w-4" />,
  },
  {
    href: "/dashboard/roles",
    label: "Roles",
    icon: <User className="h-4 w-4" />,
  },
  {
    href: "/dashboard/chihois",
    label: "Chi Hội",
    icon: <Users2 className="h-4 w-4" />,
  },
];

export const CREATE_EDIT_FIELDS_EXCLUDE = [
  "id",
  "reference",
  "updated_at",
  "created_at",
  "last_login_at",
  "role",
  "permission_groups",
];
export const READ_FIELDS_EXCLUDE = ["password", "permission_ids"];
