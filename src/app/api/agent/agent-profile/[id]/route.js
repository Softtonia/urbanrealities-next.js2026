import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Get token from headers
    const authHeader = req.headers.get('authorization');//get token from header
    console.log("token",authHeader)
    // Forward token if available
    const response = await get(`/api/get-user-details-by-id?id=${id}`, {
        headers: {
            'Authorization': authHeader,
        },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API error:", error?.response || error);
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    );
  }
}
