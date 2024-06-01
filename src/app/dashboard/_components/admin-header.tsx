"use client";

import { ReactNode, Suspense } from "react";
import { BreadcrumbResponsive } from "@/components/responsive-breadcrumb";
import UserProfileHeader from "@/app/dashboard/_components/user-profile-header";

export default function AdminHeader({ MobileSideBar }: { MobileSideBar: ReactNode }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {MobileSideBar && MobileSideBar}
      <div className="w-full flex-1">
        <BreadcrumbResponsive />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfileHeader />
      </Suspense>
    </header>
  );
}
