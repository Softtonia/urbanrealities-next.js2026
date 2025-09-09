// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
    // ✅ Get token from cookies
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // console.log("Token from middleware:", token);

    if (!token) {
        const loginUrl = new URL("/auth/login", request.url);

        // ✅ Add ?redirect=/original-path
        loginUrl.searchParams.set("redirect", pathname);

        return NextResponse.redirect(loginUrl);
    }

    // ✅ Allow access if token exists
    return NextResponse.next();
}

// Apply middleware only on protected routes
export const config = {
    matcher: [
        "/auth/post-property/:path*", // ✅ works for /auth/post-property and children
        "/auth/user/:path*",
        // add more protected routes here
    ],
};
