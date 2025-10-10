
import { proxyToLaravel } from "@/lib/laravelProxy";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const userId = req.nextUrl.searchParams.get("id");

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 🔹 Forward request to Laravel using your proxy
        const response = await proxyToLaravel(
            req,
            `/api/get-details-byuserid?id=${userId}`,
            "GET"
        );

        return response;
    } catch (error) {
        console.error("Proxy error:", error);

        // ✅ Clear token on failure (e.g., invalid token)
        const cookieStore = await cookies();
        cookieStore.set({
            name: "token",
            value: "",
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}