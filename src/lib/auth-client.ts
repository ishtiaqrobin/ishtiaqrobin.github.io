import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // IMPORTANT: baseURL must be the FRONTEND's own origin.
  // next.config.ts rewrites /api/auth/* → backend, making auth requests
  // same-origin. This prevents browsers from blocking cross-site cookies.
  baseURL: env.NEXT_PUBLIC_APP_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
