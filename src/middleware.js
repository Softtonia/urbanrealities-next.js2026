// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
    // ✅ Get token from cookies
    const token = request.cookies.get("token")?.value;

    console.log("Token from middleware:", token);

    // If no token → redirect to login page
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Otherwise allow request to continue
    return NextResponse.next();
}

// Apply middleware only on protected routes
export const config = {
    matcher: ["/all-agent/:path*", "/auth/post-property/:path*"], // ✅ use :path* not :path
};
