// import { NextResponse } from 'next/server';
// import { post } from '@/lib/api';

// export async function POST(request) {
//     try {
//         const formData = await request.formData();

//         // Convert FormData into something axios/fetch can handle
//         const formDataToSend = new FormData();

//         for (const [key, value] of formData.entries()) {
//             if (value instanceof File) {
//                 // ✅ If it's a File, append directly
//                 formDataToSend.append(key, value);
//             } else if (Array.isArray(value)) {
//                 // ✅ If somehow it's an array (File[]), append each one
                // value.forEach((file) => {
//                     formDataToSend.append(key, file);
//                 });
//             } else {
//                 formDataToSend.append(key, value);
//             }
//         }
//         // console.log(formDataToSend)

//         const token = formData.get("token");

//         const response = await post(`/api/add-properties-listing`, formDataToSend, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 // very important: let axios handle Content-Type for FormData
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         return NextResponse.json(response.data);
//     } catch (error) {
//         console.error("Registration Error:", error?.response?.data || error.message);
//         return NextResponse.json(
//             { error: error?.response?.data?.message || error.message },
//             { status: 500 }
//         );
//     }
// }

import { proxyToLaravel } from "@/lib/laravelProxy";

export async function POST(req) {
    const formdata = await req.formData();

    // Forward request to Laravel via proxy
    return proxyToLaravel(req, "/api/add-properties-listing", "POST", formdata);
}

