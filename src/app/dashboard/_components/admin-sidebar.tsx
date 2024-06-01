"use client";
import { Bell, Package2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SubnavDropdown from "@/components/subnav-dropdown";
import { SIDEBAR_ITEMS } from "@/lib/constants";

export default function AdminSidebar() {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="">Acme Inc</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {SIDEBAR_ITEMS.map((item) => (
            <SubnavDropdown key={item.href} item={item} />
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        {/* <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full">
          Upgrade
        </Button>
      </CardContent>
    </Card> */}
      </div>
    </div>
  );
}
