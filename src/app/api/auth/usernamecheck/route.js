// app/api/check-username/route.js (Next.js 13+ API Route)
import { NextResponse } from "next/server";
import { post } from "@/lib/api"; // Axios helper

export async function POST(request) {
    try {
        const body = await request.json(); // { user_name: "..." }

        const response = await post("/api/check-username-unique", body);

        return NextResponse.json(response.data); // Send Laravel response to frontend
    } catch (error) {
        console.error("Username Check Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}
