// app/api/locations/route.js
import { get } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const country_id = searchParams.get("country_id") || 1;
    const city_id = searchParams.get("city_id") || "";

    try {
        // Forward request to Laravel backend
        const res = await get(
            `${process.env.LARAVEL_API_BASE_URL}/api/locations?country_id=${country_id}&city_id=${city_id}`);

            return NextResponse.json(res.data);
    } catch (err) {
        console.error("Error fetching cities:", err?.response?.data || err.message);
    
        // If Laravel sent an error response, forward it
        if (err.response) {
            return NextResponse.json(
                {
                    error: err.response.data?.message || err.response.data || "Laravel error",
                },
                { status: err.response.status || 500 }
            );
        }
    
        // Otherwise, fallback to generic error
        return NextResponse.json(
            { error: err.message || "Failed to fetch cities" },
            { status: 500 }
        );
    }
    
}
