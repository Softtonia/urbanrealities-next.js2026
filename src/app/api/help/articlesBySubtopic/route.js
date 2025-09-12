import { NextResponse } from 'next/server';
import { get, post } from '@/lib/api';

export async function POST(request) {
    try {
        // Read JSON data directly from the request body
        const payload = await request.json();

        // Pass the JSON payload to your Laravel API
        const response = await get(`/api/get-help-article?help_category_id=${payload.help_category_id}&help_subcategory_id=${payload.help_subcategory_id}&help_childcategory_id=${payload.help_childcategory_id}`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("child category fetch Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}