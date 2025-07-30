
// import { NextResponse } from 'next/server';
// import axiosServer from '@/lib/axios'; 

// export async function GET(request) { 
//   try {
//     const response = await axiosServer.get('/api/site-setting');

//     return NextResponse.json(response.data.data, { status: 200 });

//   } catch (error) {
//     console.error('Error in Next.js API route:', error.message);
//     return NextResponse.json({
//       message: 'Failed to fetch data via proxy',
//       error: error.message,
//       statusCode: error.response?.status || 500,
//     }, { status: error.response?.status || 500 });
//   }
// }

// app/api/site-setting/route.js


import { NextResponse } from 'next/server';
import { get } from '@/lib/api';

export async function GET() {
  try {
    const response = await get(`/api/site-setting`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}