import axios from "axios";
import { BACKEND_BASE_URL } from "../config/api";

const instance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

// ?? Add JWT automatically (if exists)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
