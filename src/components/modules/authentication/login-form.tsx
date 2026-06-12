// "use client";

// import { useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { User } from "@/types";
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
// import {
//   Loader2,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { GoogleAuthButton } from "./GoogleAuthButton";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema, LoginFormValues } from "@/lib/validation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// export function LoginForm({ ...props }: React.ComponentProps<"div">) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: LoginFormValues) => {
//     setIsLoading(true);

//     try {
//       // signIn.email() returns { data, error } where data contains user & session.
//       // We read the role directly from the response — no second getSession() call needed.
//       // Calling getSession() immediately after signIn causes a race condition because
//       // the browser may not have stored the cookie yet (especially cross-origin).
//       const { data, error } = await authClient.signIn.email({
//         email: values.email,
//         password: values.password,
//       });

//       if (error) {
//         toast.error(error.message || "Login failed");
//         return;
//       }

//       toast.success("Login successful!");

//       const userRole = (data?.user as User)?.role;

//       if (userRole === "ADMIN") {
//         router.push("/admin-dashboard");
//       } else {
//         router.push("/user-dashboard");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card
//       className="w-full max-w-lg mx-auto rounded-3xl border border-primary/20 shadow-lg hover:shadow-2xl shadow-primary-400/25 hover:shadow-primary-400/50 transition-all duration-500"
//       {...props}
//     >
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-left">
//           Login to your account
//         </CardTitle>
//         <CardDescription className="text-left">
//           Enter your email below to login to your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-[14px] h-4 w-4 text-muted-foreground" />
//                       <Input
//                         placeholder="your@email.com"
//                         className="pl-10"
//                         disabled={isLoading}
//                         {...field}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <div className="flex items-center justify-between">
//                     <FormLabel>Password</FormLabel>
//                     <Link
//                       href="/forgot-password"
//                       className="text-sm text-primary hover:underline"
//                     >
//                       Forgot Password?
//                     </Link>
//                   </div>
//                   <FormControl>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-[14px] h-4 w-4 text-muted-foreground" />
//                       <Input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="••••••••"
//                         className="pl-10 pr-10"
//                         disabled={isLoading}
//                         {...field}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
//                         disabled={isLoading}
//                       >
//                         {showPassword ? (
//                           <EyeOff className="h-4 w-4" />
//                         ) : (
//                           <Eye className="h-4 w-4" />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               // size={"md"}
//               className="w-full cursor-pointer"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Logging in...
//                 </>
//               ) : (
//                 <>Login</>
//               )}
//             </Button>
//           </form>
//         </Form>

//         {/* Google auth button */}
//         <GoogleAuthButton mode="login" />
//       </CardContent>
//       <CardFooter>
//         <p className="text-sm text-center w-full text-muted-foreground">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/register"
//             className="text-primary hover:underline font-medium"
//           >
//             Register
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User } from "@/types";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthButton } from "./GoogleAuthButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HoverButton from "../shared/HoverButton";
import ShimmerText from "../shared/ShimmerText";

export function LoginForm({ ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful!");

      const userRole = (data?.user as User)?.role;

      if (userRole === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/user-dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-lg mx-auto bg-white dark:bg-[#111116] border border-zinc-100 dark:border-zinc-800/40 rounded-3xl p-8 shadow-xs select-none"
      {...props}
    >
      {/* Header */}
      <div className="mb-8">
        <ShimmerText className="mb-3">Welcome back</ShimmerText>
        <h2 className="text-3xl font-clash font-medium tracking-tight text-secondary leading-tight">
          Login to your account
        </h2>
        <p className="text-sm text-text-primary mt-1">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-sm leading-4 font-medium text-secondary mb-1.5 block">
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-text-primary/50" />
                    <Input
                      placeholder="your@email.com"
                      className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-10 rounded-xl text-base tracking-wide pl-9 pr-3 py-2 transition-all focus-visible:ring-2"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <div className="flex items-center justify-between mb-1.5">
                  <FormLabel className="text-sm leading-4 font-medium text-secondary">
                    Password
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-text-primary/50" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-white dark:bg-[#111116] border-zinc-200/80 dark:border-zinc-800/80 h-10 rounded-xl text-base tracking-wide pl-9 pr-10 py-2 transition-all focus-visible:ring-2"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-text-primary/50 hover:text-text-primary transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 font-medium" />
              </FormItem>
            )}
          />

          <div className="pt-1">
            <HoverButton
              type="submit"
              loading={isLoading}
              className="w-full justify-center"
            >
              {isLoading ? "Logging in..." : "Login"}
            </HoverButton>
          </div>
        </form>
      </Form>

      {/* Divider */}
      {/* <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs text-text-primary/50 font-normal tracking-wide">
          or continue with
        </span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      </div> */}

      {/* Google Auth */}
      <GoogleAuthButton className="mt-6 w-full" mode="login" />

      {/* Footer */}
      <p className="text-sm text-center text-text-primary mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
