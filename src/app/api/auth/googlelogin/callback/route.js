// /app/api/auth/googlelogin/callback/route.js
import { get } from '@/lib/api'; // Using GET instead of POST for query params
import { proxyToLaravel } from '@/lib/laravelProxy';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const role_id = searchParams.get('role_id');

    // Forward to Laravel API with query params
    const url = `/api/auth/google/callback?code=${code}&role_id=${role_id}`;

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, url, "GET");

    // Clear token cookie after 

    return response;
}