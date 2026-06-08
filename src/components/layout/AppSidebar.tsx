"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Route } from "@/types";
import { PERSONAL_INFO } from "@/utils/constants";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  routes: Route[];
  quickActions?: {
    title: string;
    items: {
      title: string;
      url: string;
      icon: LucideIcon;
      tooltip?: string;
    }[];
  };
}

export function AppSidebar({
  routes,
  quickActions,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleSignOut = async () => {
    await logout();
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="h-screen flex flex-col" {...props}>
      {/* shrink-0 যাতে header compress না হয় */}
      <SidebarHeader className="border-b shrink-0">
        {/* Logo */}
        <Link href="/" className="p-2.5">
          <motion.div
            className="text-2xl font-bold font-mono text-gray-900 dark:text-white hover:text-primary transition-colors cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="text-primary">&lt;</span>
            {PERSONAL_INFO.name.split(" ")[0]}
            <span className="text-primary"> /&gt;</span>
          </motion.div>
        </Link>
      </SidebarHeader>

      {/* min-h-0 ছাড়া overflow-y-auto কাজ করবে না */}
      <SidebarContent className="flex-1 overflow-y-auto min-h-0">
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link href={item.url} onClick={handleLinkClick}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {quickActions && (
          <SidebarGroup>
            <SidebarGroupLabel>{quickActions.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.tooltip || item.title}
                    >
                      <Link href={item.url} onClick={handleLinkClick}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* shrink-0 যাতে footer compress না হয় */}
      <SidebarFooter className="border-t shrink-0">
        {!user ? (
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col flex-1 min-w-0 gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>{user?.name?.charAt(0) || ""}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">
                {user?.name || ""}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {user?.email || ""}
              </span>
            </div>
          </div>
        )}
        <Separator />
        <div className="p-2">
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="xs"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 hover:cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
