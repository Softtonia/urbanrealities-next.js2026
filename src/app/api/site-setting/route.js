
// import axios from 'axios';
// import { NextResponse } from 'next/server';

// export async function GET(request) { 
//   try {
//     const laravelApiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/site-setting`;

//     const response = await axios.get(laravelApiUrl, {
//       headers: {
//         'X-Client-ID': process.env.X_CLIENT_ID,
//         'X-Client-Secret': process.env.X_CLIENT_SECRET,
//         'Origin': process.env.NEXT_PUBLIC_API_URL,
//       },
//       withCredentials: true,
//     });

//     return NextResponse.json(response.data.data, { status: 200 }); 

//   } catch (error) {
//     console.error('Error in Next.js API route (server-side proxy):', error.message);
//     return NextResponse.json({
//       message: 'Failed to fetch site settings from backend API via proxy',
//       error: error.message,
//       statusCode: error.response?.status || 500,
//     }, { status: error.response?.status || 500 });
//   }
// }

// app/api/site-setting/route.js (या app/api/subscribe-email/route.js)

import { NextResponse } from 'next/server';
import axiosServer from '@/lib/axios'; 

export async function GET(request) { 
  try {
    const response = await axiosServer.get('/api/site-setting');

    return NextResponse.json(response.data.data, { status: 200 });

  } catch (error) {
    console.error('Error in Next.js API route:', error.message);
    return NextResponse.json({
      message: 'Failed to fetch data via proxy',
      error: error.message,
      statusCode: error.response?.status || 500,
    }, { status: error.response?.status || 500 });
  }
}