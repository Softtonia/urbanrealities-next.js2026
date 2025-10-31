import { get } from '@/lib/api'; // Using GET instead of POST for query params
import { proxyToLaravel } from '@/lib/laravelProxy';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
   const page =searchParams.get('page');
   const per_page = searchParams.get('per_page')

    // Forward to Laravel API with query params
    const url = `/api/get-current-property-by-company-project?project_id=${id}&page=${page}&per_page=${per_page}`;

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, url, "GET");

    // Clear token cookie after 

    return response;
}