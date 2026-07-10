import { BASE_URL } from '@/constants/constants';
import axios, { AxiosError } from 'axios';

type ApiErrorResponse = {
  message: string;
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'text/plain',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const message = error.response.data?.message || 'Ошибка сервера';
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(
        new Error('Нет ответа от сервера. Пожалуйста, попробуйте позже.'),
      );
    }

    return Promise.reject(new Error('Неизвестная ошибка. Попробуйте позже.'));
  },
);

export default api;
