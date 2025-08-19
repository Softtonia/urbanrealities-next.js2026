import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } =await params; 
    const { searchParams } = new URL(req.url);
    const purpose_id = searchParams.get("purpose_id");
    console.log(id)

    try {
        const response = await get(
            `/api/get-property-by-user-id-filter-by-purpose/${id}?purpose_id=${purpose_id}`
        );
        console.log(response)
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error in Next.js API route:", error?.response?.data || error.message);
        return NextResponse.json(
            { status: false, properties: [] },
            { status: 500 }
        );
    }
}
