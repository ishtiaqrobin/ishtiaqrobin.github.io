// "use client";

// import { useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import { env } from "@/env";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Loader2, Chrome } from "lucide-react";
// import Image from "next/image";
// import GoogleLogo from "@/assets/images/icon/google_icon.png";

// interface GoogleAuthButtonProps {
//   mode?: "login" | "signup";
//   className?: string;
// }

// export function GoogleAuthButton({
//   mode = "login",
//   className,
// }: GoogleAuthButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGoogleAuth = async () => {
//     setIsLoading(true);

//     try {
//       await authClient.signIn.social({
//         provider: "google",
//         // callbackURL must be on the FRONTEND origin so the session
//         // cookie (set via Next.js rewrite proxy) is accessible.
//         // Never hardcode localhost — use the env variable.
//         callbackURL: `${env.NEXT_PUBLIC_APP_URL}/user-dashboard`,
//       });
//     } catch (error) {
//       console.error("Google auth error:", error);
//       toast.error(`Google ${mode} failed`);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       type="button"
//       variant="outline"
//       // size={"md"}
//       className={className || "w-full cursor-pointer"}
//       onClick={handleGoogleAuth}
//       disabled={isLoading}
//       // icon={Chrome}
//     >
//       {isLoading ? (
//         mode === "login" ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Login...
//           </>
//         ) : (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Sign up...
//           </>
//         )
//       ) : (
//         <>
//           <Image
//             alt="Google Logo"
//             src={GoogleLogo}
//             width={24}
//             height={24}
//             className="h-4 w-4 mr-2"
//           ></Image>
//           {mode === "login" ? "Login" : "Sign up"} with Google
//         </>
//       )}
//     </Button>
//   );
// }

"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";
import { toast } from "sonner";
import Image from "next/image";
import GoogleLogo from "@/assets/images/icon/google_icon.png";
import HoverButton from "../shared/HoverButton";

interface GoogleAuthButtonProps {
  mode?: "login" | "signup";
  className?: string;
}

export function GoogleAuthButton({
  mode = "login",
  className,
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/user-dashboard`,
      });
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error(`Google ${mode} failed`);
      setIsLoading(false);
    }
  };

  return (
    <HoverButton
      type="button"
      onClick={handleGoogleAuth}
      loading={isLoading}
      className={className || "w-full justify-center"}
    >
      <span className="flex items-center justify-center gap-2">
        <Image
          alt="Google"
          src={GoogleLogo}
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
        />
        {mode === "login" ? "Login" : "Sign up"} with Google
      </span>
    </HoverButton>
  );
}
