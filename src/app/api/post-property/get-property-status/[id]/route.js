// import { get } from '@/lib/api';
// import { NextResponse } from 'next/server';

// export async function GET(req,{params}) {
//     try {
//         const id = params.id;
//         console.log("demo",id)
//         const authHeader = req.headers.get('authorization');//get token from header
//         console.log("token",authHeader)

//         const response = await get(`/api/property-status-listing-by-propertytype?property_type_id=${id}`, {
//             headers: {
//                 'Authorization': authHeader,
//             },
//         });
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

import { proxyToLaravel } from "@/lib/laravelProxy";

export async function GET(req,{params}) {
    // const body = await req.json();
     const id = params.id;
   

    // Forward request to Laravel via proxy
    const url=`/api/property-status-listing-by-propertytype?property_type_id=${id}`
    const response = await proxyToLaravel(req, url, "GET");

    return response;
}
