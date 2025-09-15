// middlewareAuth.js
import { NextResponse } from "next/server";

export function middlewareAuth(request) {
  const { pathname } = request.nextUrl;

  // ✅ 1. Auth check
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ 2. Allow access if token exists
  return NextResponse.next();
}

// Apply only on protected routes
export const config = {
  matcher: [
    // "/auth/post-property/:path*",
    // "/auth/user/:path*",
  ],
};
