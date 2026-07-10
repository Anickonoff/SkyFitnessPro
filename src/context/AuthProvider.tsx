'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { LoginProps } from '@/services/auth/authtypes';
import authApi from '@/services/auth/authApi';

export type User = {
  name: string;
  email: string;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);
  useEffect(() => {
    const raw = localStorage.getItem('token');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const updateUserData = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };
  const updateToken = (token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  const login = async (data: LoginProps): Promise<void> => {
    try {
      const response = await authApi.login(data);
      if (!response.token) {
        throw new Error(response.message || 'Ошибка авторизации');
      }
      console.log(response.token);
      updateToken(response.token);

      const user = await authApi.getUserInfo();
      console.log(user);
      const userData = {
        name: user.user.email.split('@')[0],
        email: user.user.email,
      };
      updateUserData(userData);
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = (): void => {
    updateUserData(null);
    updateToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
