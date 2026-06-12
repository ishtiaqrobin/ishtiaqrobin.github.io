// "use client";

// import { useState, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Loader2, Mail, CheckCircle2 } from "lucide-react";
// import Link from "next/link";

// function VerifyEmailContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") || "";

//   const [otp, setOtp] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isResending, setIsResending] = useState(false);

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (otp.length !== 6) {
//       toast.error("Please enter a valid 6-digit OTP");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const { error } = await authClient.emailOtp.verifyEmail({
//         email,
//         otp,
//       });

//       if (error) {
//         toast.error(error.message || "Verification failed");
//         return;
//       }

//       toast.success("Email verified successfully!");
//       router.push("/login");
//     } catch (error) {
//       console.error("Verification error:", error);
//       toast.error("An error occurred during verification");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setIsResending(true);
//     try {
//       const { error } = await authClient.emailOtp.sendVerificationOtp({
//         email,
//         type: "email-verification",
//       });

//       if (error) {
//         toast.error(error.message || "Failed to resend OTP");
//         return;
//       }

//       toast.success("OTP resent to your email");
//     } catch (error) {
//       console.error("Resend error:", error);
//       toast.error("Failed to resend OTP");
//     } finally {
//       setIsResending(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto rounded-3xl border border-primary/20 shadow-lg hover:shadow-2xl shadow-primary-400/25 hover:shadow-primary-400/50 transition-all duration-500">
//       <CardHeader className="text-center">
//         <div className="flex justify-center mb-4">
//           <div className="p-3 bg-primary/10 rounded-full">
//             <Mail className="h-8 w-8 text-primary" />
//           </div>
//         </div>
//         <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
//         <CardDescription>
//           We&apos;ve sent a 6-digit code to{" "}
//           <span className="font-bold text-foreground">{email}</span>. Please
//           enter it below to verify your account.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleVerify} className="space-y-4">
//           <div className="space-y-2">
//             <Input
//               type="text"
//               placeholder="000000"
//               className="text-center text-2xl tracking-[1em] font-bold h-"
//               maxLength={6}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//               disabled={isLoading}
//               required
//             />
//           </div>
//           <Button
//             type="submit"
//             size={"md"}
//             className="w-full cursor-pointer"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Verifying...
//               </>
//             ) : (
//               "Verify Email"
//             )}
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter className="flex flex-col space-y-4">
//         <div className="text-sm text-center text-muted-foreground">
//           Didn&apos;t receive the code?{" "}
//           <button
//             onClick={handleResendOtp}
//             disabled={isResending || isLoading}
//             className="text-primary cursor-pointer hover:underline font-medium disabled:opacity-50"
//           >
//             {isResending ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Resending...
//               </>
//             ) : isLoading ? (
//               "Resending..."
//             ) : (
//               "Resend Code"
//             )}
//           </button>
//         </div>
//         <Link
//           href="/login"
//           className="text-sm text-primary hover:underline font-medium"
//         >
//           Back to Login
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }

// export default function VerifyEmailPage() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <Suspense
//         fallback={
//           <Card className="w-full max-w-md mx-auto border-primary/20">
//             <CardContent className="flex items-center justify-center py-10">
//               <Loader2 className="h-10 w-10 animate-spin text-primary" />
//             </CardContent>
//           </Card>
//         }
//       >
//         <VerifyEmailContent />
//       </Suspense>
//     </div>
//   );
// }

"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import ShimmerText from "@/components/modules/shared/ShimmerText";
import HoverButton from "@/components/modules/shared/HoverButton";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (error) {
        toast.error(error.message || "Verification failed");
        return;
      }

      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (error) {
        toast.error(error.message || "Failed to resend OTP");
        return;
      }

      toast.success("OTP resent to your email");
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-[#111116] border border-zinc-100 dark:border-zinc-800/40 rounded-3xl px-4 sm:px-6 shadow-xs select-none">
      {/* Header */}
      <div className="mb-8">
        <ShimmerText className="mb-3">Almost there</ShimmerText>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-clash font-medium tracking-tight text-secondary leading-tight">
            Verify your email
          </h2>
        </div>
        <p className="text-sm text-text-primary mt-1">
          We&apos;ve sent a 6-digit code to{" "}
          <span className="font-semibold text-secondary">{email}</span>. Please
          enter it below to verify your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="space-y-0">
          <Input
            type="text"
            placeholder="000000"
            className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-12 rounded-xl text-2xl tracking-[1em] font-bold text-center transition-all focus-visible:ring-2"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            disabled={isLoading}
            required
          />
        </div>

        <div className="pt-1">
          <HoverButton
            type="submit"
            loading={isLoading}
            className="w-full justify-center"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </HoverButton>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="text-sm text-text-primary">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResendOtp}
            disabled={isResending || isLoading}
            className="text-primary cursor-pointer hover:underline font-medium disabled:opacity-50 inline-flex items-center gap-1"
          >
            {isResending ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Resending...
              </>
            ) : (
              "Resend Code"
            )}
          </button>
        </p>
        <Link
          href="/login"
          className="text-sm text-primary hover:underline font-medium"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Suspense
        fallback={
          <Card className="w-full max-w-lg mx-auto border-zinc-100 dark:border-zinc-800/40 rounded-3xl">
            <CardContent className="flex items-center justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </CardContent>
          </Card>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
