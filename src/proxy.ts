import { NextRequest, NextResponse } from "next/server";
import { sessionService } from "./services/session.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  try {
    // ✅ getSession() নয় — Edge runtime এ next/headers কাজ করে না
    // ✅ getSessionFromRequest(request) — request থেকে cookie forward করে
    const { data } = await sessionService.getSessionFromRequest(request);

    if (data?.user) {
      isAuthenticated = true;
      isAdmin = data.user.role === Roles.admin;
    }
  } catch (error) {
    console.error("Session fetch error in middleware:", error);
  }

  //* Redirect if authenticated user tries to access /login
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    return NextResponse.next();
  }

  //* User is not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* User is authenticated and role = ADMIN
  //* User can not visit user dashboard
  if (isAdmin && pathname.startsWith("/user-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  //* User is authenticated and role = USER
  //* User can not visit admin dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/user-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user-dashboard",
    "/user-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
  ],
};
