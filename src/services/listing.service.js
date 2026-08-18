import axios from "axios";
import {
  NEXT_PUBLIC_API_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";

const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
    "X-App-Type": APP_TYPE,
  },
});

export const fetchUserListings = async (
  token,
  filter = "all",
  perPage = 5,
  page = 1,
  search = "",
  sortBy = "",
  isFeatured = false
) => {
  try {
    const params = {
      users_property_listings: filter,
      per_page: perPage,
      page: page,
    };
    if (search) params.search = search;
    if (sortBy) params.sort_by = sortBy;
    if (isFeatured) params.is_featured = true;

    const response = await apiClient.get(`/api/frontend/listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user listings via axios:", error);
    throw error;
  }
};

export const submitListing = async (token, payload, listingId = null) => {
  try {
    const endpoint = listingId
      ? `/api/frontend/listings/${listingId}/update`
      : `/api/frontend/listings`;

    const response = await apiClient.post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting listing:", error);
    throw error;
  }
};

export const updateListingAvailability = async (token, listingId, status) => {
  try {
    const response = await apiClient.patch(
      `/api/user-listings/${listingId}/availability`,
      {
        availability_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating listing availability:", error);
    throw error;
  }
};

export const toggleFeatureListing = async (token, listingId) => {
  try {
    const response = await apiClient.post(
      `/api/membership/feature-listing/toggle`,
      {
        listing_id: listingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling feature listing:", error);
    throw error;
  }
};

export const deleteListing = async (token, listingId) => {
  try {
    const response = await apiClient.delete(
      `/api/frontend/listings/${listingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
};
