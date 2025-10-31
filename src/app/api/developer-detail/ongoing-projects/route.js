import { get } from '@/lib/api'; // Using GET instead of POST for query params
import { proxyToLaravel } from '@/lib/laravelProxy';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const page = searchParams.get('page');
    const per_page = searchParams.get('per_page');

    // Forward to Laravel API with query params
    const url = `/api/get-all-ongoing-projects-by-developer?developer_id=${id}&per_page=${per_page}&page=${page}`;

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, url, "GET");

    // Clear token cookie after /api/developer-detail/completed-project/1?page=1&per_page=4

    return response;
}