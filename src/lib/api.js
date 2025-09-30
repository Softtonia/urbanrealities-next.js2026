// lib/api.js
import { axiosInstance, getToken, withRequest } from "./axios";

/**
 * Internal helper to inject token into headers
 */
const injectToken = async (config = {}) => {
  const token = await getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

// ✅ GET request
export const get = async (url, req, config = {}) => {
  const finalConfig = await injectToken(config);
  return withRequest(req, () => axiosInstance.get(url, finalConfig));
};

// ✅ POST request
export const post = async (url, data, req, config = {}) => {
  const finalConfig = await injectToken(config);
  return withRequest(req, () => axiosInstance.post(url, data, finalConfig));
};

// ✅ PUT request
export const put = async (url, data, req, config = {}) => {
  const finalConfig = await injectToken(config);
  return withRequest(req, () => axiosInstance.put(url, data, finalConfig));
};

// ✅ DELETE request
export const del = async (url, req, config = {}) => {
  const finalConfig = await injectToken(config);
  return withRequest(req, () => axiosInstance.delete(url, finalConfig));
};

export const getssr = async (url, config = {}) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return axiosInstance.get(url, config);
};

export const postssr = async (url, data, config = {}) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return axiosInstance.post(url, data, config);
};

export const putssr = async (url, data, config = {}) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return axiosInstance.put(url, data, config);
};

export const delssr = async (url, config = {}) => {
  const token = await getToken();
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return axiosInstance.delete(url, config);
};
