// app/api/check-username/route.js (Next.js 13+ API Route)
import { NextResponse } from "next/server";
import { post } from "@/lib/api"; // Axios helper

export async function POST(req) {
    try {
        const body = await req.json(); // { user_name: "..." }

        const response = await post("/api/check-unique", body,req);

        return NextResponse.json(response.data); // Send Laravel response to frontend
    } catch (error) {
        console.error("phone Check Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}
