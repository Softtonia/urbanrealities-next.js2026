import { NextResponse } from 'next/server';
import { get, post } from '@/lib/api';

export async function POST(req) {
    try {
        // Read JSON data directly from the request body
        const payload = await req.json();

        // Pass the JSON payload to your Laravel API
        const response = await get(`/api/get-help-article-by-id/${payload.article_id}`,req);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("child category fetch Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}