import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PHP_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
