// axios config to call api refreshToken each time an api fall with 403
import axios, { AxiosInstance } from "axios";

export const reApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? `${import.meta.env.VITE_BASE_DEV_URL}`
    : `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

reApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await reApi.post("/api/auth/refreshToken");
        if (response.status === 200) {
          return reApi(originalRequest);
        }
      } catch (refreshError) {
        console.log(refreshError);
      }

      // If we reach here, either the refresh token request failed or returned non-200 status
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
