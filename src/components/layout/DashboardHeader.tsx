"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "@/components/modules/auth/LogoutButton";
import { User, Menu } from "lucide-react";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";
import { PERSONAL_INFO } from "@/utils/constants";
// import { motion } from "framer-motion";
import { motion } from "motion/react";

export function DashboardHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getDashboardUrl = () => {
    if (user?.role === "ADMIN") return "/admin-dashboard";
    return "/user-dashboard";
  };

  const getUserRoutes = () => {
    if (user?.role === "ADMIN") return adminRoutes[0]?.items || [];
    return userRoutes[0]?.items;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-full w-9 h-9"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader className="px-4 pt-4 pb-1">
                <SheetTitle>
                  <Link href="/">
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
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground px-2">
                    {user?.role === "ADMIN" && "Admin Menu"}
                    {user?.role === "USER" && "User Dashboard"}
                  </h3>
                  <nav className="space-y-1">
                    {getUserRoutes().map((route) => {
                      const Icon = route.icon;
                      const isActive = pathname === route.url;
                      return (
                        <Link
                          key={route.url}
                          href={route.url}
                          onClick={() => setIsSheetOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-muted text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{route.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h2 className="text-lg font-semibold">
            {user?.role === "ADMIN" && "Admin Dashboard"}
            {user?.role === "USER" && "User Dashboard"}
          </h2>
        </div>

        {/* Profile Menu */}
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user?.image || undefined}
                    alt={user?.name}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground mt-1">
                    Role: {user?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={getDashboardUrl()} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutButton
                  variant="ghost"
                  className="w-full justify-start px-2"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
