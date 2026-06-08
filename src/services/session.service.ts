import { env } from "@/env";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

async function fetchSession(cookieHeader: string) {
  try {
    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok)
      return { data: null, error: { message: "Failed to fetch session" } };

    const session = await res.json();

    if (session === null) {
      return { data: null, error: { message: "No active session" } };
    }

    return { data: session, error: null };
  } catch (err) {
    console.error("Error fetching session:", err);
    return { data: null, error: { message: "Error fetching session" } };
  }
}

export const sessionService = {
  /**
   * Get session from Edge Middleware (proxy.ts).
   * Passes the incoming request's cookie header to the backend.
   * next/headers cookies() does NOT work in Edge runtime.
   */
  getSessionFromRequest: async function (request: NextRequest) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    return fetchSession(cookieHeader);
  },

  /**
   * Get session from Server Components / Server Actions / Route Handlers.
   * Uses next/headers cookies() which is available in Node.js runtime.
   */
  getSession: async function () {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    return fetchSession(cookieHeader);
  },
};
