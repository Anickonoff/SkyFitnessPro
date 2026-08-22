import { BASE_URL } from '@/constants/constants';
import { triggerLogout } from '@/context/authEvents';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

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
  if (typeof window === 'undefined') {
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const isClient = typeof window !== 'undefined';
    if (error.response) {
      if (error.response.status === 401) {
        triggerLogout();
        if (isClient) {
          toast.warning('Сессия истекла. Выполните вход снова.', {
            id: 'session-expired',
          });
        }
        return Promise.reject(
          new Error('Сессия истекла. Выполните вход снова.'),
        );
      }
      if (error.response.status >= 500) {
        if (isClient) {
          toast.error('Ошибка сервера. Попробуйте позже.', {
            id: 'server-error',
          });
        }
      }
      const message = error.response.data?.message || 'Ошибка сервера';
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      if (isClient) {
        toast.error('Нет ответа от сервера. Попробуйте позже.', {
          id: 'network-error',
        });
      }
      return Promise.reject(
        new Error('Нет ответа от сервера. Пожалуйста, попробуйте позже.'),
      );
    }

    if (isClient) {
      toast.error('Неизвестная ошибка. Попробуйте позже.');
    }
    return Promise.reject(new Error('Неизвестная ошибка. Попробуйте позже.'));
  },
);

export default api;
