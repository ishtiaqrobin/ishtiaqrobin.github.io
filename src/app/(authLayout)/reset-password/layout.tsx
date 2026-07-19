import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your Ishtiaq Robin account using the verification code sent to your email.",
  keywords: [
    "Ishtiaq Robin",
    "Reset Password",
    "New Password",
    "Account Security",
  ],
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
