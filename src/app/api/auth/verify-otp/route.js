import { NextResponse } from 'next/server';
import { post } from '@/lib/api'; // This should be your axios/fetch wrapper

export async function POST(request) {
    try {
        const body = await request.json();
        
        const token = body.token;

        const response = await post(`/api/verify-email-otp`, body,req);

        // console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Registration Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: 500 }
        );
    }
}