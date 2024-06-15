import { MenuItem } from "@/types/menu-item";
import {
  Building,
  Building2,
  GroupIcon,
  Home,
  HomeIcon,
  Key,
  KeySquare,
  User,
  Users,
  Users2,
  Users2Icon,
  Wrench,
} from "lucide-react";

export const SIDEBAR_ITEMS: MenuItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: "#",
    label: "Quản Lý đăng nhập",
    icon: <KeySquare className="h-4 w-4" />,
    subItems: [
      {
        href: "/dashboard/employees",
        label: "Employee",
        icon: <User className="h-4 w-4" />,
      },
      {
        href: "/dashboard/roles",
        label: "Roles",
        icon: <Wrench className="h-4 w-4" />,
      },
    ],
  },
  {
    href: "#",
    label: "Quản Lý chi hội",
    icon: <Building2 className="h-4 w-4" />,
    subItems: [
      {
        href: "/dashboard/chihois",
        label: "Chi Hội",
        icon: <Building className="h-4 w-4" />,
      },
      {
        href: "/dashboard/tochucs",
        label: "Tổ chức",
        icon: <GroupIcon className="h-4 w-4" />,
      },
      {
        href: "/dashboard/hoiviens",
        label: "Hội viên",
        icon: <User className="h-4 w-4" />,
      },
    ],
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
export const READ_FIELDS_EXCLUDE = ["password", "permission_ids", "id"];
