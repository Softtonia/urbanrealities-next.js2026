// /src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { post } from '@/lib/api';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Request body:", body);

        // Extract token from request headers (if frontend sends it)
        const token = req.headers.get('authorization') || '';

        // Pass token in Authorization header
        const response = await post('/api/leads', body, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error?.response?.data);
        return NextResponse.json(
            { message: error?.response?.data?.message || "Request failed" },
            { status: error?.response?.status || 500 }
        );
    }
}
