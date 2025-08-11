// /src/app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import { post } from '@/lib/api';

export async function POST(req) {
    try {
        const body = await req.json();

        const response = await post('/api/login', body);
        // console.log(response.data)
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { message: error?.response?.data?.message || "Login failed" },
            { status: error?.response?.status || 500 }
        );
    }
}
