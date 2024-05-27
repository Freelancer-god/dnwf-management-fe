"use client";
import NavItem, { MenuItem } from "@/components/nav-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SubnavDropdown({ item }: { item: MenuItem }) {
  const pathName = usePathname();

  return item.subItems && item.subItems.length > 0 ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn("flex items-center justify-between", pathName === item.href && "bg-muted")}
        >
          <NavItem item={item} />
          <ChevronDown className="mr-3 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {item.subItems?.map((subitem: MenuItem) => (
          <DropdownMenuItem key={item.href} asChild>
            <NavItem item={subitem} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <NavItem item={item} />
  );
}
