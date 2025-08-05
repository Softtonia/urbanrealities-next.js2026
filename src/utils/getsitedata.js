// import { get } from '@/lib/api';

// export default async function getSiteSettings() {
//   try {

//     const response = await get(`/api/site-setting`);

//     return response.data.data;
//   } catch (error) {
//     console.error('FULL ERROR:', {
//       message: error.message,
//       code: error.code,
//       response: error.response?.data,
//       status: error.response?.status,
//     });
//     return {
//     };
//   }
// }



import { get } from "@/lib/api";

let cachedSettings = null;
let fetchPromise = null;
export default async function getSiteSettings() {
  if (cachedSettings) return cachedSettings;
  if (fetchPromise) return await fetchPromise;
  try {
    fetchPromise = get(`/api/site-setting`);
    const response = await fetchPromise;
    cachedSettings = response.data.data;

    const defaultSettings = {
      site_name: "UrbanRealitiess",
      copyright_text: `© ${new Date().getFullYear()} UrbanRealitiess`,
      site_short_description: "We build your dream",
      favicon: "/default-favicon.png",
       meta_keywords: [], 
    };

    return { ...defaultSettings, ...cachedSettings };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {};
  } finally {
    fetchPromise = null; 
  }
}
