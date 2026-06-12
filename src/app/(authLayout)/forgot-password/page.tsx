// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Loader2, Mail, ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) {
//       toast.error("Please enter your email");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const { error } = await authClient.emailOtp.sendVerificationOtp({
//         email,
//         type: "forget-password",
//       });

//       if (error) {
//         toast.error(error.message || "Failed to send reset code");
//         return;
//       }

//       toast.success("Reset code sent to your email!");
//       router.push(`/reset-password?email=${encodeURIComponent(email)}`);
//     } catch (error) {
//       console.error("Forgot password error:", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <Card className="w-full max-w-md mx-auto rounded-3xl border border-primary/20 shadow-lg hover:shadow-2xl shadow-primary-400/25 hover:shadow-primary-400/50 transition-all duration-500">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
//           <CardDescription>
//             Enter your email address and we&apos;ll send you a 6-digit code to
//             reset your password.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-[14px] h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="name@example.com"
//                   className="pl-10"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={isLoading}
//                   required
//                 />
//               </div>
//             </div>
//             <Button
//               type="submit"
//               // size={"md"}
//               className="w-full cursor-pointer"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Sending Code...
//                 </>
//               ) : (
//                 "Send Reset Code"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter>
//           <Link
//             href="/login"
//             className="flex items-center text-sm text-primary hover:underline font-medium"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Login
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ShimmerText from "@/components/modules/shared/ShimmerText";
import HoverButton from "@/components/modules/shared/HoverButton";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "forget-password",
      });

      if (error) {
        toast.error(error.message || "Failed to send reset code");
        return;
      }

      toast.success("Reset code sent to your email!");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-[#111116] border border-zinc-100 dark:border-zinc-800/40 rounded-3xl p-8 shadow-xs select-none">
        {/* Header */}
        <div className="mb-8">
          <ShimmerText className="mb-3">Password Recovery</ShimmerText>
          <h2 className="text-3xl font-clash font-medium tracking-tight text-secondary leading-tight">
            Forgot Password?
          </h2>
          <p className="text-sm text-text-primary mt-1">
            Enter your email address and we&apos;ll send you a 6-digit code to
            reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-0">
            <Label className="text-sm leading-4 font-medium text-secondary mb-1.5 block">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-text-primary/50" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-10 rounded-xl text-base tracking-wide pl-9 pr-3 py-2 transition-all focus-visible:ring-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="pt-1">
            <HoverButton
              type="submit"
              loading={isLoading}
              className="w-full justify-center"
            >
              {isLoading ? "Sending Code..." : "Send Reset Code"}
            </HoverButton>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6">
          <Link
            href="/login"
            className="flex items-center justify-center text-sm text-primary hover:underline font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
