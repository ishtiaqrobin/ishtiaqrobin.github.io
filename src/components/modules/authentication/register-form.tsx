// "use client";

// import { useState } from "react";
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
// import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { GoogleAuthButton } from "./GoogleAuthButton";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema, RegisterFormValues } from "@/lib/validation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: RegisterFormValues) => {
//     setIsLoading(true);

//     try {
//       const { error } = await authClient.signUp.email({
//         email: values.email,
//         password: values.password,
//         name: values.name,
//         callbackURL: process.env.FRONTEND_URL,
//       });

//       if (error) {
//         toast.error(error.message || "Registration failed");
//         return;
//       }

//       toast.success("Registration successful!");

//       router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
//     } catch (error) {
//       console.error("Registration error:", error);
//       toast.error("Registration failed");
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
//           Create an account
//         </CardTitle>
//         <CardDescription className="text-left">
//           Enter your information below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full Name</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <User className="absolute left-3 top-[14px] h-4 w-4 text-muted-foreground" />
//                       <Input
//                         placeholder="Enter your full name"
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
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-[14px] h-4 w-4 text-muted-foreground" />
//                       <Input
//                         placeholder="Enter your email"
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
//                   <FormLabel>Password</FormLabel>
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
//                         className="absolute right-3 top-[14px] text-muted-foreground hover:text-foreground transition-colors"
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
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Registering...
//                 </>
//               ) : (
//                 <>Register Now</>
//               )}
//             </Button>
//           </form>
//         </Form>

//         <GoogleAuthButton mode="signup" />
//       </CardContent>
//       <CardFooter>
//         <p className="text-sm text-center w-full text-muted-foreground">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="text-primary hover:underline font-medium"
//           >
//             Login
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthButton } from "./GoogleAuthButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/validation";
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

export function RegisterForm({ ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: process.env.FRONTEND_URL,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");

      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
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
        <ShimmerText className="mb-3">Get started</ShimmerText>
        <h2 className="text-3xl font-clash font-medium tracking-tight text-secondary leading-tight">
          Create an account
        </h2>
        <p className="text-sm text-text-primary mt-1">
          Enter your information below to create your account
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-sm leading-4 font-medium text-secondary mb-1.5 block">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-text-primary/50" />
                    <Input
                      placeholder="Enter your full name"
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
                      placeholder="Enter your email"
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
                <FormLabel className="text-sm leading-4 font-medium text-secondary mb-1.5 block">
                  Password
                </FormLabel>
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
              {isLoading ? "Registering..." : "Register Now"}
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
      <GoogleAuthButton className="mt-6 w-full" mode="signup" />

      {/* Footer */}
      <p className="text-sm text-center text-text-primary mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
