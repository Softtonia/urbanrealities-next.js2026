// middlewareIp.js
import { NextResponse } from "next/server";

export function middlewareIp(request) {
    // ✅ Extract client IP
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "0.0.0.0";

    console.log("Client IP:", clientIp); // For debugging

    // ✅ Clone headers and add IP
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("X-Forwarded-For", clientIp);
    // requestHeaders.set("X-Internal-Token", process.env.NEXTJS_SHARED_SECRET || "");

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

// Apply only on API routes
export const config = {
    matcher: [
        "/api/:path*",
    ],
};
