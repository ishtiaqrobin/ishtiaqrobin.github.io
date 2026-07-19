import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description:
    "Verify your email address on Ishtiaq Robin's platform using the 6-digit code sent to your inbox.",
  keywords: [
    "Ishtiaq Robin",
    "Verify Email",
    "Email Verification",
    "Account Activation",
  ],
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
