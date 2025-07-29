import axios from 'axios';

export default async function getSiteSettings() {
  try {
    console.log(" SERVER ENV CHECK");
     console.log('API Endpoint:', process.env.NEXT_PUBLIC_API_ENDPOINT);
    console.log('Client ID:', process.env.X_CLIENT_ID);
    console.log('Client Secret:', process.env.X_CLIENT_SECRET);

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/site-setting`, {
      headers: {
        'X-Client-ID': process.env.X_CLIENT_ID,
        'X-Client-Secret': process.env.X_CLIENT_SECRET,
        'Origin':process.env.NEXT_PUBLIC_API_URL,

        'Accept': 'application/json',
      },
      timeout: 5000,
    });

    return response.data.data; // ✅ proper data
  } catch (error) {
    console.error('FULL ERROR:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
      site_name: 'UrbanRealities',
      site_short_description: 'We build your dream',
    };
  }
}
