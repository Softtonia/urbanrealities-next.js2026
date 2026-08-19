import axios from "axios";
import CryptoJS from "crypto-js";

// Add a global interceptor to handle 401 responses for all API calls
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we are on the client-side, clear storage and log the user out
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

import {
  LARAVEL_API_BASE_URL,
  LARAVEL_APPLICATION_PASSWORD,
  NEXT_ORIGIN,
  APP_TYPE,
  ENABLE_SIGNATURE,
} from "./config";

function createNonce() {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
}

function sha256(value = "") {
  return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
}

function createSignature({ method, requestUri, timestamp, nonce, body }) {
  const bodyHash = sha256(body || "");

  const payload = [
    method.toUpperCase(),
    requestUri,
    timestamp,
    nonce,
    bodyHash,
  ].join("\n");

  return (
    "sha256=" +
    CryptoJS.HmacSHA256(payload, LARAVEL_APPLICATION_PASSWORD).toString(CryptoJS.enc.Hex)
  );
}

function buildRequestUrl(path, query = {}) {
  const baseUrl = LARAVEL_API_BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${baseUrl}${cleanPath}`);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

export async function laravelApi(path, options = {}) {
  if (!LARAVEL_API_BASE_URL) {
    throw new Error("LARAVEL_API_BASE_URL is missing.");
  }

  if (!LARAVEL_APPLICATION_PASSWORD) {
    throw new Error("LARAVEL_APPLICATION_PASSWORD is missing.");
  }

  const method = (options.method || "GET").toUpperCase();

  const url = buildRequestUrl(path, options.query);

  const body =
    options.body !== undefined && options.body !== null
      ? JSON.stringify(options.body)
      : "";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",

    // New final flow
    "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
    "X-App-Type": APP_TYPE,
    "Origin": NEXT_ORIGIN,
    "X-App-Origin": NEXT_ORIGIN,

    // Debug only
    "X-Debug-API-Client": "1",

    ...(options.headers || {}),
  };

  if (ENABLE_SIGNATURE) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = createNonce();
    const requestUri = url.pathname + url.search;

    const signature = createSignature({
      method,
      requestUri,
      timestamp,
      nonce,
      body,
    });

    headers["X-Timestamp"] = timestamp;
    headers["X-Nonce"] = nonce;
    headers["X-Signature"] = signature;
  }

  try {
    const response = await axios.request({
      url: url.toString(),
      method,
      data: body || undefined,
      headers,
      withCredentials: false,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: error.response.data,
      };
    }

    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
}