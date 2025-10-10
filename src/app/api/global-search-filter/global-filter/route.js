// app/api/globle-search-engine/route.js

import { NextResponse } from 'next/server';
import { post } from '@/lib/api'; // This should be your axios/fetch wrapper

export async function POST(req) {
    try {
        const body = await req.json();

        console.log(body)
        const response = await post(`/api/global-filters`, body,req);

        return NextResponse.json(response.data); // return Laravel's response to frontend
    } catch (error) {
        console.error("Registration Error:", error?.response);
        return NextResponse.json(
            { error: error?.response?.data?.errors},
            { status: error.status ||500 }
        );
    }
}
