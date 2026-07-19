import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your password for Ishtiaq Robin's platform. Enter your email to receive a verification code.",
  keywords: [
    "Ishtiaq Robin",
    "Forgot Password",
    "Password Reset",
    "Account Recovery",
  ],
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
