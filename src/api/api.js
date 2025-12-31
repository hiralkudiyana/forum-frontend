import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "https://api.originalgig.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
