import type { Metadata } from "next";
import { RegisterForm } from "@/components/modules/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a new account on Ishtiaq Robin's platform to collaborate on projects and access development resources.",
  keywords: [
    "Ishtiaq Robin",
    "Register",
    "Sign Up",
    "Create Account",
  ],
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 sm:px-6">
      <RegisterForm />
    </div>
  );
}
