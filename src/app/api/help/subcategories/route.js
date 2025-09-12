// src/app/api/help/subcategories/route.js
import { NextResponse } from "next/server";
import { post } from "@/lib/api";

const cache = new Map(); // { key: { data, expiry } }
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function POST(request) {
  try {
    const payload = await request.json();
    const cacheKey = `subcategories:${payload.help_category_id}`;

    // ✅ Check cache first
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return NextResponse.json(cached.data);
    }

    // 🚀 If not cached → fetch from Laravel
    const response = await post(`/api/help-subcategory-by-categoryid`, payload);

    // ✅ Save to cache
    cache.set(cacheKey, {
      data: response.data,
      expiry: Date.now() + CACHE_TTL,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Subcategory fetch error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: error?.response?.data?.message || error.message },
      { status: error?.response?.status || 500 }
    );
  }
}
