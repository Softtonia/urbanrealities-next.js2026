// /src/app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import { post } from '@/lib/api';

export async function POST(req) {
    const authHeader = req.headers.get('authorization');//get token from header
        console.log("token",authHeader)
    try {
        const body = await req.json();

        const response = await post('/api/custom-field-listing-by-model-conditionid', body,{
            headers:{
                'Authorization': authHeader
            }
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error.response.data)
        return NextResponse.json(
            { message: error?.response?.data?.message || "custom field fetching failed failed" },
            { status: error?.response?.status || 500 }
        );
    }
}
