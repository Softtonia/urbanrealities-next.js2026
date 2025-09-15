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
        console.error("Error fetching cities:", err);
        return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
    }
}
