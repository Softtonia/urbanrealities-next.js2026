import axios from 'axios';
import { NEXT_PUBLIC_API_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from "@/lib/config";

const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
    "X-App-Type": APP_TYPE,
  }
});

export const fetchUserListings = async (token, filter = 'all', perPage = 5, page = 1) => {
  try {
    const response = await apiClient.get(`/api/users-property-listing`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        users_property_listings: filter,
        per_page: perPage,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user listings via axios:", error);
    throw error;
  }
};
