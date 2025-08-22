

import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await get(`/api/get-pages-by-id?slug=sales-and-refunds`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
