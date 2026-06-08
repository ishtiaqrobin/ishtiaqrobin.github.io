"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function DashboardLayout({
  children,
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { user: userState, isLoading } = useAuth();
  const pathname = usePathname();

  const segments = pathname?.split("/").filter(Boolean) ?? [];

  const formatLabel = (segment: string) => {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      {/* h-screen + overflow-hidden — layout viewport-এ lock */}
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        {/* flex-col + overflow-hidden — শুধু content area scroll করবে */}
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 flex md:hidden" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {segments.map((segment, index) => {
                  const href = `/${segments.slice(0, index + 1).join("/")}`;
                  const isLast = index === segments.length - 1;

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {formatLabel(segment)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {formatLabel(segment)}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {/* ✅ data-lenis-prevent — Lenis এই area-তে scroll capture করবে না */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6" data-lenis-prevent>
            {userState?.role === "ADMIN" && admin}
            {userState?.role === "USER" && user}
            {!userState?.role && children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
