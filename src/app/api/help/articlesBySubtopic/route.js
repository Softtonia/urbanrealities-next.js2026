// src/app/api/help/articles/route.js
import { NextResponse } from "next/server";
import { get } from "@/lib/api";

// 🗄️ In-memory cache
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function POST(request) {
    try {
        const payload = await request.json();

        // Build query params safely
        const params = new URLSearchParams();
        if (payload.help_category_id) params.append("help_category_id", payload.help_category_id);
        if (payload.help_subcategory_id) params.append("help_subcategory_id", payload.help_subcategory_id);
        if (payload.help_childcategory_id) params.append("help_childcategory_id", payload.help_childcategory_id);

        const url = `/api/get-help-article?${params.toString()}`;

        // ✅ Check cache first
        const cached = cache.get(url);
        if (cached && cached.expiry > Date.now()) {
            return NextResponse.json(cached.data);
        }

        // 🚀 Fetch from Laravel
        const response = await get(url);

        // ✅ Save to cache
        cache.set(url, { data: response.data, expiry: Date.now() + CACHE_TTL });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("article fetch Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}
