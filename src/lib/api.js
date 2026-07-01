import { laravelApi } from "./axios";

export const get = async (url, req, config = {}) => {
  return laravelApi(url, { ...config, method: "GET" });
};

export const post = async (url, data, req, config = {}) => {
  return laravelApi(url, { ...config, method: "POST", body: data });
};

export const put = async (url, data, req, config = {}) => {
  return laravelApi(url, { ...config, method: "PUT", body: data });
};

export const del = async (url, req, config = {}) => {
  return laravelApi(url, { ...config, method: "DELETE" });
};

export const getssr = async (url, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  return laravelApi(url, { ...config, method: "GET" });
};

export const postssr = async (url, data, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  return laravelApi(url, { ...config, method: "POST", body: data });
};

export const putssr = async (url, data, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  return laravelApi(url, { ...config, method: "PUT", body: data });
};

export const delssr = async (url, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  return laravelApi(url, { ...config, method: "DELETE" });
};
