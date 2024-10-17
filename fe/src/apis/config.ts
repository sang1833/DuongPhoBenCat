import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? `${import.meta.env.VITE_BASE_DEV_URL}`
    : `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
