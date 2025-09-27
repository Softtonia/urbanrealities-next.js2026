

import { get } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const response = await get(`/api/get-pages-by-id?slug=terms-of-use`,req);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
