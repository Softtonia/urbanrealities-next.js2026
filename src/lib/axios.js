import axios from "axios";
import { cookies } from "next/headers";
// import {
//   LARAVEL_API_BASE_URL,
//   CLIENT_ID,
//   CLIENT_SECRET,
//   APP_TYPE,
//   NEXT_PUBLIC_URL,
// } from "./config";

let currentReq = null;

export const withRequest = (req, fn) => {
  currentReq = req;
  return fn().finally(() => (currentReq = null));
};

// 🔹 Token getter (SSR + Client)
// export async function getToken(req) {
//   try {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("token") || null;
//     }
//     const cookieStore = await cookies();
//     const bodyToken = req?.body?.token;
//     console.log("token",bodyToken)
//     return bodyToken || cookieStore.get("token")?.value || null;
//   } catch {
//     return null;
//   }
// }

// 🔹 Axios Instance
const axiosInstance = axios.create({
  baseURL:  process.env.LARAVEL_API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    "X-App-Type": process.env.X_APP_TYPE,
    // "Content-Type": "application/json",
    "Origin": process.env.NEXT_PUBLIC_API_URL,
  },
});

// 🔹 Request Interceptor
axiosInstance.interceptors.request.use(async (config) => {
  // const token = await getToken(currentReq);
  // if (token) config.headers.Authorization = `Bearer ${token}`;

  // Forward IP if available
  let clientIp =
    currentReq?.headers?.get?.("x-forwarded-for")?.split(",")[0] ||
    currentReq?.headers?.["x-forwarded-for"]?.split(",")[0] ||
    currentReq?.ip ||
    "0.0.0.0";

  config.headers["X-Forwarded-For"] = clientIp;
  return config;
});

export { axiosInstance };
