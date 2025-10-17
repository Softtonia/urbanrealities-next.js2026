import { get } from '@/lib/api'; // Using GET instead of POST for query params
import { proxyToLaravel } from '@/lib/laravelProxy';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const cityId = searchParams.get('cityId');
    const stateId = searchParams.get('stateId');
    const countryId = searchParams.get('countryId');

    // Forward to Laravel API with query params
    const url = `/api/get-near-by-projects/${id}?country_id=${countryId}&state_id=${stateId}&city_id=${cityId}`;

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, url, "GET");

    // Clear token cookie after 

    return response;
}