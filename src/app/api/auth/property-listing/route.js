// import { get } from '@/lib/api';
// import { NextResponse } from 'next/server';

// export async function GET(req) {
//     try {
     
//         const authHeader = req.headers.get('authorization');//get token from header
//         console.log("token",authHeader)

//         const response = await get(`/api/user-properties`,req);
//         // console.log(response)

//         return NextResponse.json(response.data);
//     } catch (error) {
//         console.error(error?.response || error);
//         return NextResponse.json(
//             { error: 'Failed to fetch property listing' },
//             { status: 500 }
//         );
//     }
// }

// /app/api/auth/googlelogin/callback/route.js
import { get } from '@/lib/api'; // Using GET instead of POST for query params
import { proxyToLaravel } from '@/lib/laravelProxy';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');

    // Forward to Laravel API with query params
    const url = `/api/user-properties?page=${page}`;

    // Forward request to Laravel via proxy
    const response = await proxyToLaravel(req, url, "GET");

    // Clear token cookie after 

    return response;
}