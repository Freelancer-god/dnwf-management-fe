import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";

export default function DropDownModalWrapper({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const modal = useModal();

  return (
    <DropdownMenuItem onClick={() => modal?.show(children)} className={className}>
      {label}
    </DropdownMenuItem>
  );
}
