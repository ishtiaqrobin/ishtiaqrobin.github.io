"use client";

import * as React from "react";
import { Sidebar as SidebarPrimitive } from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { useAuth } from "@/hooks/useAuth";
import {
  ChartColumn,
  Gift,
  Home,
  Settings,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { AppSidebar } from "./AppSidebar";

export function DashboardSidebar(
  props: React.ComponentProps<typeof SidebarPrimitive>,
) {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

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
            title: "Stats",
            url: "/admin-dashboard/stats",
            icon: ChartColumn,
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
      variant="inset"
      className="border-r"
      routes={routes}
      quickActions={quickActions}
    />
  );
}
