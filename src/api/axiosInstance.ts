import axios from 'axios';
import settings from './config';

const api = axios.create({
  baseURL: settings.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Неавторизованный запрос — переход на страницу входа');
      if (window.location.href !== 'http://localhost:5173/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
