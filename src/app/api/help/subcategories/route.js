import { NextResponse } from 'next/server';
import { post } from '@/lib/api';

export async function POST(request) {
    try {
        // Read JSON data directly from the request body
        const payload = await request.json();

        // Pass the JSON payload to your Laravel API
        const response = await post(`/api/help-subcategory-by-categoryid`, payload);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("sub category fetch Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}