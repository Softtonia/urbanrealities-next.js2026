// app/api/locations/route.js
import { get } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const country_id = searchParams.get("country_id") || '';
    const city_id = searchParams.get("city_id") || "";
    const search = searchParams.get("search") || "";

    

    // console.log('ip',{req})

    try {
        // Forward request to Laravel backend
        const queryParams = new URLSearchParams();
        if (country_id) queryParams.append("country_id", country_id);
        if (city_id) queryParams.append("city_id", city_id);
        if (search) queryParams.append("search", search);

        const res = await get(
            `/api/locations?${queryParams.toString()}`,req
        );
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
            { error: err.response.data?.message },
            { status: 500 }
        );
    }

}
