/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  variant?: "default" | "outline" | "ghost" | "destructive";
  className?: string;
  showIcon?: boolean;
  size?: "lg" | "md" | "sm" | "icon";
}

export function LogoutButton({
  variant = "outline",
  className,
  // showIcon = false,
  size = "sm",
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            // Force refresh and redirect
            router.refresh();
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
          },
          onError: (ctx: any) => {
            toast.error("Logout failed");
            console.error("Logout error:", ctx.error);
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleLogout}
      disabled={isLoading}
      size={size}
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
