import { get } from '@/lib/api';
import axios from 'axios';

export default async function getSiteSettings() {
    try {
        const response = await get('/api/site-setting')

        return response.data.data; // ✅ plain JSON object
    } catch (error) {
        console.error('Error fetching site settings:', error.message);

        // Return fallback/default values
        return {
            site_name: 'UrbanRealities',
            site_short_description: 'We build your dream',
        };
    }
}
