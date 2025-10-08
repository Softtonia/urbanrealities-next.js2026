import { axiosInstance, withRequest } from "./axios";

// 🧹 Cleaned proxy methods (no token injection)
export const get = async (url, req, config = {}) =>
  withRequest(req, async () => {
    return axiosInstance.get(url, config);
  });

export const post = async (url, data, req, config = {}) =>
  withRequest(req, async () => {
    return axiosInstance.post(url, data, config);
  });

export const put = async (url, data, req, config = {}) =>
  withRequest(req, async () => {
    return axiosInstance.put(url, data, config);
  });

export const del = async (url, req, config = {}) =>
  withRequest(req, async () => {
    return axiosInstance.delete(url, config);
  });


export const getssr = async (url, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
 
  return axiosInstance.get(url, config);
};

export const postssr = async (url, data, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
  
  return axiosInstance.post(url, data, config);
};

export const putssr = async (url, data, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
 
  return axiosInstance.put(url, data, config);
};

export const delssr = async (url, config = {}) => {
  config.headers = {
    ...config.headers,
    'X-Nextjs-Build-Key': process.env.NEXTJS_INTERNAL_KEY,
  };
 
  return axiosInstance.delete(url, config);
};
