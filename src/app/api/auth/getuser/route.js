import { get } from "@/lib/api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(req) {
    try {
        const token = req.headers.get("authorization")?.replace("Bearer ", "");
        const userId = req.nextUrl.searchParams.get("id");

        if (!token || !userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Call Laravel server via Axios wrapper
        const res = await get(
            `${process.env.LARAVEL_API_BASE_URL}/api/get-details-byuserid?id=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        console.log(res.data);

        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Proxy error:", error?.response?.data || error.message);
        cookies().set({
            name: "token",
            value: "",
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0, // expire immediately
          });

        // ✅ Forward Laravel error if available
        if (error.response) {
            return NextResponse.json(
                error.response.data || { error: "Token invalid or expired" },
                { status: error.response.status }
            );
        }

        // ✅ Fallback for unexpected errors
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
