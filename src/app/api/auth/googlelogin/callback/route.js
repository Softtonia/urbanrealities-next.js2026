// /app/api/auth/googlelogin/callback/route.js
import { get } from '@/lib/api'; // Using GET instead of POST for query params
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get('code');
        const role_id = searchParams.get('role_id');
        // console.log("codde and role",code)

        if (!code || !role_id) {
            return NextResponse.json(
                { error: 'Missing required parameters: code and role_id' },
                { status: 400 }
            );
        }

        // Forward to Laravel API with query params
        const response = await get(`/api/auth/google/callback?code=${code}&role_id=${role_id}`,req);
        
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.response?.data || 'Request failed' },
            { status: error.response?.status || 500 }
        );
    }
}
