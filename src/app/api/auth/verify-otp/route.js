import { NextResponse } from 'next/server';
import { post } from '@/lib/api'; // This should be your axios/fetch wrapper

export async function POST(request) {
    try {
        const body = await request.json();
        
        const token = body.token;
        
        console.log(token)
        // if (!token || token !== process.env.EXPECTED_TOKEN) {
        //     return new Response("Unauthorized", { status: 401 });
        // }

        const response = await post(`/api/verify-email-otp`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Registration Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data?.message || error.message },
            { status: 500 }
        );
    }
}