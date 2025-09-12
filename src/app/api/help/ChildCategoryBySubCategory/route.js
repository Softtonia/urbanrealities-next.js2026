// src/app/api/help/childcategories/route.js
import { NextResponse } from "next/server";
import { post } from "@/lib/api";

// 🗄️ In-memory cache (works per server instance)
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function POST(request) {
    try {
        const payload = await request.json();
        const key = JSON.stringify(payload);

        // ✅ Check cache first
        const cached = cache.get(key);
        if (cached && cached.expiry > Date.now()) {
            return NextResponse.json(cached.data);
        }

        // 🚀 Call Laravel API if cache miss
        const response = await post(`/api/help-childcategory-by-subcategoryid`, payload);

        // ✅ Save to cache
        cache.set(key, { data: response.data, expiry: Date.now() + CACHE_TTL });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("child category fetch Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}
