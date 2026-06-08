import { NextRequest, NextResponse } from "next/server";
import { sessionService } from "./services/session.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

  try {
    // Server-side session check — pass request so cookies are forwarded
    const { data } = await sessionService.getSessionFromRequest(request);

    if (data?.user) {
      isAuthenticated = true;
      userRole = data.user.role || null;
    }
  } catch (error) {
    console.error("Session fetch error in middleware:", error);
  }

  // 1. User is not authenticated - redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Role-based routing logic
  const isAdmin = userRole === Roles.admin;
  const isUser = userRole === Roles.user;

  // ADMIN protection
  if (isAdmin) {
    if (pathname.startsWith("/user-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  // USER protection
  if (isUser) {
    if (pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/user-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Routes to be protected by this middleware
export const config = {
  matcher: ["/user-dashboard/:path*", "/admin-dashboard/:path*"],
};
