// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     console.log('Fetching site settings...');
//     const settingsResponse = await fetch('https://urbanrealities.com/public/api/site-setting', {
//       cache: 'no-store'
//     });
    
//     if (!settingsResponse.ok) {
//       console.error('Settings response not OK:', settingsResponse.status);
//       throw new Error('Failed to fetch site settings');
//     }

//     const settings = await settingsResponse.json();
//     console.log('Site Settings Response:', settings);
    
//     if (!settings.favicon) {
//       console.error('No favicon URL in settings');
//       throw new Error('No favicon URL found in site settings');
//     }

//     console.log('Attempting to fetch favicon from:', settings.favicon);
//     const faviconResponse = await fetch(settings.favicon, {
//       cache: 'no-store'
//     });
    
//     if (!faviconResponse.ok) {
//       console.error('Favicon response not OK:', faviconResponse.status);
//       throw new Error('Failed to fetch favicon');
//     }

//     const contentType = faviconResponse.headers.get('content-type');
//     console.log('Favicon content type:', contentType);

//     const faviconBuffer = await faviconResponse.arrayBuffer();
//     console.log('Favicon buffer size:', faviconBuffer.byteLength);

//     if (faviconBuffer.byteLength === 0) {
//       throw new Error('Favicon buffer is empty');
//     }
    
//     return new NextResponse(faviconBuffer, {
//       headers: {
//         'Content-Type': contentType || 'image/x-icon',
//         'Cache-Control': 'public, max-age=31536000, immutable',
//       },
//     });
//   } catch (error) {
//     console.error('Detailed error in favicon route:', error);
//     return new NextResponse(null, { 
//       status: 500,
//       statusText: error.message 
//     });
//   }
// }
