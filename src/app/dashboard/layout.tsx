import AdminHeader from "@/app/dashboard/_components/admin-header";
import AdminMobileSidebar from "@/app/dashboard/_components/admin-mobile-sidebar";
import AdminSidebar from "@/app/dashboard/_components/admin-sidebar";
import { auth } from "@/auth";
import ClientTokenProvider from "@/components/providers/client-token-provider";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ClientTokenProvider>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <AdminSidebar />
          </div>
          <div className="flex min-h-0 min-w-0 flex-col">
            <AdminHeader MobileSideBar={<AdminMobileSidebar />} />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
          </div>
        </div>
      </ClientTokenProvider>
    </SessionProvider>
  );
}
