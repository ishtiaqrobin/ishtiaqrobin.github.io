import type { Metadata } from "next";
import { LoginForm } from "@/components/modules/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Ishtiaq Robin account to manage projects, view dashboard, and access exclusive content.",
  keywords: [
    "Ishtiaq Robin",
    "Login",
    "Sign In",
    "Account Access",
  ],
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 sm:px-6">
      <LoginForm />
    </div>
  );
}
