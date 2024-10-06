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
    if (error.response.status === 403) {
      try {
        await reApi.post("/api/auth/refreshToken");
        // If refresh successful, retry the original request
        return reApi(error.config);
      } catch (refreshError) {
        // If refresh fails, redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
