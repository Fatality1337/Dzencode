import axios from 'axios';
import { AUTH_TOKEN_KEY, storage } from '../utils/storage';
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 8000,
});
apiClient.interceptors.request.use((config) => {
  const token = storage.get<string | null>(AUTH_TOKEN_KEY, null);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(error.response?.data?.message || 'Не удалось связаться с сервером')),
);
