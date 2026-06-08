"use client";

import dynamic from "next/dynamic";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const SmoothScrollProvider = dynamic(
  () => import("@/providers/SmoothScrollProvider"),
  { ssr: false },
);

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dashboard route-এ Lenis smooth scroll disable
  // নাহলে inner overflow-y-auto scroll কাজ করে না
  const isDashboard = pathname?.includes("dashboard");

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {isDashboard ? (
        children
      ) : (
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      )}
    </NextThemesProvider>
  );
}
