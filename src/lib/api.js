import { axiosInstance, getToken } from "./axios";

// ✅ get request
export const get = async (url, config = {}) => {
  const token = await getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return axiosInstance.get(url, config);
};

// ✅ post request
export const post = async (url, data, config = {}) => {
  const token = await getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return axiosInstance.post(url, data, config);
};

// ✅ put request
export const put = async (url, data, config = {}) => {
  const token = await getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return axiosInstance.put(url, data, config);
};

// ✅ delete request
export const del = async (url, config = {}) => {
  const token = await getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return axiosInstance.delete(url, config);
};
