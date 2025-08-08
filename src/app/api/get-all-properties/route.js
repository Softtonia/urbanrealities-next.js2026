// import { NextResponse } from 'next/server';
// import { get } from '@/lib/api';

// export async function GET() {
//   try {
//     const response = await get(`/api/get-all-properties-listing-no-auth`);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch properties' },
//       { status: error.response?.status || 500 }
//     );
//   }
// }


import { get } from "@/lib/api";

export async function GET() {
  try {
    const response = await get(`/api/get-all-properties-listing-no-auth`);
    return Response.json(response.data); // ✅ Success response
  } catch (error) {
    console.error("API error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch properties",
        details: error.response?.data || null,
      }),
      {
        status: error.response?.status || 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
