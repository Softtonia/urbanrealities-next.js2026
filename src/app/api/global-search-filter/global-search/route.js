// app/api/globle-search-engine/route.js

// import { NextResponse } from 'next/server';
// import { post } from '@/lib/api'; // This should be your axios/fetch wrapper

// export async function POST(req) {
//     try {
//         const body = await req.json();

//         console.log(body)
//         const response = await post(`/api/global-search`, body, req);

//         return NextResponse.json(response.data); // return Laravel's response to frontend
//     } catch (error) {
//         console.error("Registration Error:", error?.response);
//         return NextResponse.json(
//             { error: error?.response?.data?.errors },
//             { status: error.status || 500 }
//         );
//     }
// }

import { proxyToLaravel } from "@/lib/laravelProxy";

export async function POST(req) {
    const body = await req.json();

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, "/api/global-search", "POST", body);

    return response;
}