// lib/http.js
import axios from "axios";

// 🔹 Detect runtime and define getToken
let getToken;

if (typeof window === "undefined") {
  // Server-side
  try {
    const { cookies } = require("next/headers");
    getToken = async () => {
      const cookieStore = await cookies();
      return cookieStore.get("token")?.value || null;
    };
  } catch (err) {
    console.error("Server-side cookie access failed:", err);
    getToken = async () => null;
  }
} else {
  // Client-side
  getToken = async () => {
    try {
      const match = document.cookie.match(/(^| )token=([^;]+)/);
      return match ? match[2] : null;
    } catch {
      return null;
    }
  };
}

// ✅ Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.LARAVEL_API_BASE_URL,
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    "X-App-Type": process.env.X_APP_TYPE,
    "Content-Type": "application/json",
    "Origin": process.env.NEXT_PUBLIC_API_URL,
  },
  withCredentials: true,
});

// 🔹 Request interceptor to inject token and optional client IP
let currentReq = null;

export const withRequest = (req, fn) => {
  currentReq = req;
  return fn().finally(() => {
    currentReq = null;
  });
};

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (currentReq) {
    // Handle both Web Request and plain object
    let headers = currentReq.headers;
    let clientIp = "0.0.0.0";

    if (headers) {
      // If headers is a Headers instance (Web API)
      if (typeof headers.get === "function") {
        clientIp = headers.get("x-forwarded-for")?.split(",")[0] || currentReq.ip || "0.0.0.0";
      } else if (typeof headers === "object") {
        // If headers is a plain object (Node.js or custom)
        clientIp = headers["x-forwarded-for"]?.split(",")[0] || currentReq.ip || "0.0.0.0";
      }
    }

    config.headers["X-Forwarded-For"] = clientIp;
  }

  return config;
});

export { axiosInstance, getToken };
