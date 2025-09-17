import axios from "axios";

let getToken;

// 🔹 Detect runtime
if (typeof window === "undefined") {
  // Server-side
  try {
    const { cookies } = require("next/headers");
    getToken = async () => {
      const cookieStore = await cookies();
      return cookieStore.get("token")?.value || null;
    };
  } catch {
    getToken = async () => null;
  }
} else {
  // Client-side
  getToken = () => {
    try {
      const match = document.cookie.match(/(^| )token=([^;]+)/);
      return match ? match[2] : null;
    } catch {
      return null;
    }
  };
}

const axiosInstance = axios.create({
  baseURL: process.env.LARAVEL_API_BASE_URL,
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    'X-App-Type':process.env.X_APP_TYPE,
    'X-App-Type':process.env.X_APP_TYPE,
    "Content-Type": "application/json",
    "Origin": process.env.NEXT_PUBLIC_API_URL,
  },
  withCredentials: true,
});

// ✅ Export both axiosInstance and getToken for api.js to use
export { axiosInstance, getToken };