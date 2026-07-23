import { laravelApi } from "@/lib/axios";

export async function getRoleListing() {
  return await laravelApi("/api/admin/role-listing", { method: "GET" });
}

export async function getUserById(id) {
  return await laravelApi(`/api/get-userdata-by-id?id=${id}`, {
    method: "GET",
  });
}

export async function checkUsername(userName) {
  return await laravelApi("/api/auth/usernamecheck", {
    method: "POST",
    body: { user_name: userName },
  });
}

export async function checkEmail(email) {
  return await laravelApi("/api/auth/register/checkmail", {
    method: "POST",
    body: { email },
  });
}

export async function checkPhone(phone) {
  return await laravelApi("/api/auth/register/checkphone", {
    method: "POST",
    body: { phone },
  });
}

export async function checkUserDuplicate(email, phone) {
  return await laravelApi("/api/check-user-duplicate", {
    method: "POST",
    body: { email, phone },
  });
}

export async function forgotPassword(email) {
  return await laravelApi("/api/forget-password", {
    method: "POST",
    body: { email },
  });
}

export async function generateEmailOtp(email) {
  console.log(email, "email");
  return await laravelApi("/api/generate-email-otp", {
    method: "POST",
    body: { email },
  });
}

export async function verifyEmailOtp(email, email_otp) {
  console.log("email and otp", email, email_otp);
  return await laravelApi("/api/verify-email-otp", {
    method: "POST",
    body: { email, email_otp },
  });
}

export async function resetPassword(payload) {
  return await laravelApi("/api/reset-password", {
    method: "POST",
    body: payload,
  });
}

// Additional auth service methods:

// For local proxy routes (which set HttpOnly cookies), we use standard fetch or basic axios instead of laravelApi
// because laravelApi prepends LARAVEL_API_BASE_URL which would bypass Next.js API.
import axios from "axios";
import {
  NEXT_PUBLIC_API_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";

const nextJsApi = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
    "X-App-Type": APP_TYPE,
  },
});

export async function loginUser(email, password) {
  try {
    const res = await nextJsApi.post("/api/login", { email, password });
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}

export async function getGoogleLoginLink() {
  try {
    const res = await nextJsApi.get("/api/auth/google");
    return res.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function registerUser(payload) {
  try {
    const res = await nextJsApi.post("/api/register", payload);
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}

// These go to the Next.js proxy or Laravel backend?
// resendOtp was using fetch("/api/auth/resend-otp")
export async function resendOtp(token) {
  try {
    const res = await nextJsApi.post("/api/auth/resend-otp", { token });
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}

// verifyOtp was using fetch("https://api.holiplaces.com/api/verify-register-otp")

export async function updatePersonalProfile(token, payload) {
  try {
    const res = await nextJsApi.post("/api/auth/profile/personal", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}

export async function updateProfilePhoto(token, payload) {
  try {
    const res = await nextJsApi.post("/api/auth/profile/photo", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}

export async function updateAddressProfile(token, payload) {
  try {
    const res = await nextJsApi.post("/api/auth/profile/address", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}
// This is the direct laravel backend URL. We can use laravelApi for this since it hits the backend.
export async function verifyOtp(otp, token) {
  return await laravelApi("/api/verify-register-otp", {
    method: "POST",
    body: { otp },
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getUserProfile(userId, token) {
  try {
    const res = await laravelApi(`/api/auth/getuser?user_id=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(token, payload) {
  try {
    const res = await nextJsApi.post("/api/auth/profile/password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) return { success: false, ...error.response.data };
    return { success: false, message: error.message };
  }
}
