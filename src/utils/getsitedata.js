import { get } from '@/lib/api';

export default async function getSiteSettings() {
  try {

    const response = await get(`/api/site-setting`);

    return response.data.data; // ✅ proper data
  } catch (error) {
    console.error('FULL ERROR:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
    });
    return {
    };
  }
}


