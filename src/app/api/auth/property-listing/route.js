import { proxyToLaravel } from '@/lib/laravelProxy';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || 1;
    const filter = searchParams.get('users_property_listings') || 'all';
    const perPage = searchParams.get('per_page') || 5;

    // Forward to Laravel API with query params
    const url = `/api/users-property-listing?users_property_listings=${filter}&per_page=${perPage}&page=${page}`;

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, url, "GET");

    return response;
}