'use client';

import { ModalProvider } from '@/components/modal/provider';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <ModalProvider>{children}</ModalProvider>
    </>
  );
}
