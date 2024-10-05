import axios from "axios";

const initializeApp = () => {
  if (import.meta.env.DEV) {
    axios.defaults.baseURL = `${import.meta.env.VITE_BASE_DEV_URL}`;
  }
  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
  axios.defaults.withCredentials = true;
};

export default initializeApp;
