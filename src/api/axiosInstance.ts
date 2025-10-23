import axios from 'axios';

const api = axios.create({
  baseURL: 'http://0.0.0.0:8000/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Неавторизованный запрос — переход на страницу входа');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
