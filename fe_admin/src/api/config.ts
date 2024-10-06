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
        console.log(response);
        if (response.status === 200) {
          return reApi(originalRequest);
        } else {
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Redirect to login page if refresh token fails
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
