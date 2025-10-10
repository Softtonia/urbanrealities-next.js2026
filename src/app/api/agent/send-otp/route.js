// /src/app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import { post } from '@/lib/api';

export async function POST(req) {
   
    try {
        const body = await req.json();

        const response = await post('/api/leads/send-otp', body,req);
        // console.log(response.data)
        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error?.response?.data?.message || "otp request failed" },
            { status: error?.response?.status || 500 }
        );
    }
}
