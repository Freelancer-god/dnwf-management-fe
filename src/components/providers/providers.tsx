"use client";

import { ModalProvider } from "@/components/modal/provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <ModalProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ModalProvider>
    </>
  );
}
