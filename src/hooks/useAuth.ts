"use client";

import { authClient } from "@/lib/auth-client";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const { data: sessionData, isPending: isLoading } = authClient.useSession();

  console.log(sessionData);

  const logout = async () => {
    try {
      await authClient.signOut();
      router.refresh();
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const user = sessionData?.user ? (sessionData.user as User) : null;
  const session = sessionData?.session || null;
  const isAuthenticated = !!user && !!session;

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    logout,
  };
}
