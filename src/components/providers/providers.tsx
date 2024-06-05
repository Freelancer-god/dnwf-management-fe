"use client";

import { ModalProvider } from "@/components/modal/provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster richColors className="dark:hidden" />
      <Toaster richColors theme="dark" className="hidden dark:block" />
      <ModalProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}
