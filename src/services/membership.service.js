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

export const fetchMembershipOrders = async (token, page = 1, perPage = 20) => {
  try {
    const response = await apiClient.get(`/api/membership/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching membership orders:", error);
    throw error;
  }
};

export const fetchMyStatus = async (token) => {
  try {
    const response = await apiClient.get(`/api/membership/my-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching membership status:", error);
    throw error;
  }
};

export const fetchMembershipPlans = async () => {
  try {
    const response = await apiClient.get(`/api/membership/plans`);
    return response.data;
  } catch (error) {
    console.error("Error fetching membership plans:", error);
    throw error;
  }
};

export const fetchMembershipPlanDetails = async (id, couponCode = null) => {
  try {
    let url = `/api/membership/plans/${id}`;
    if (couponCode) {
      url += `?coupon_code=${couponCode}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching membership plan ${id}:`, error);
    throw error;
  }
};

export const createMembershipOrder = async (token, data) => {
  try {
    const response = await apiClient.post(`/api/membership/orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating membership order:", error);
    throw error;
  }
};

export const getRazorpayOptions = async (token, orderId) => {
  try {
    const response = await apiClient.post(
      `/api/membership/orders/${orderId}/razorpay`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching Razorpay options for order ${orderId}:`,
      error,
    );
    throw error;
  }
};

export const verifyMembershipPayment = async (token, data) => {
  try {
    const response = await apiClient.post(
      `/api/membership/payments/verify`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying membership payment:", error);
    throw error;
  }
};
