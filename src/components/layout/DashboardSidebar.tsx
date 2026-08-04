"use client";

import * as React from "react";
import { Sidebar as SidebarPrimitive } from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { Home, Settings, TrendingUp } from "lucide-react";
import { AppSidebar } from "./AppSidebar";

export function DashboardSidebar(
  props: React.ComponentProps<typeof SidebarPrimitive>,
) {
  const { user } = useAuth();
  const pathname = usePathname();
  // On a hard reload the session hook is briefly pending. The URL already
  // identifies the active dashboard, so keep the navigation shell stable.
  const isAdmin =
    user?.role === "ADMIN" ||
    (!user && pathname?.startsWith("/admin-dashboard"));

  const routes = isAdmin ? adminRoutes : userRoutes;

  const quickActions = isAdmin
    ? {
        title: "Quick Actions",
        items: [
          {
            title: "Settings",
            url: "/admin-dashboard/settings",
            icon: Settings,
          },
          {
            title: "Analytics",
            url: "/admin-dashboard/analytics",
            icon: TrendingUp,
          },
        ],
      }
    : {
        title: "Quick Actions",
        items: [
          {
            title: "Visit Home",
            url: "/",
            icon: Home,
          },
          // {
          //   title: "My Rewards",
          //   url: "/rewards",
          //   icon: Gift,
          // },
        ],
      };

  return (
    <AppSidebar
      {...props}
      variant="inset"
      className="border-r"
      routes={routes}
      quickActions={quickActions}
    />
  );
}
