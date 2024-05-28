"use client";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/validations/menu-item-validation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ className, item }: { className?: string; item: MenuItem }) {
  const pathName = usePathname();

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 capitalize text-muted-foreground transition-all hover:text-primary",
        pathName === item.href && "bg-muted",
        className,
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}
