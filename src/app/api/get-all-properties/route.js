import { NextResponse } from 'next/server';
import { get } from '@/lib/api';

export async function GET() {
  try {
    const response = await get(`/api/get-all-properties-listing-no-auth`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: error.response?.status || 500 }
    );
  }
}