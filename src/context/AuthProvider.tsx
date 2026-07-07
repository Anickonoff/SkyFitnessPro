'use client';

import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import { LoginProps } from '@/services/auth/authtypes';
import authApi from '@/services/auth/authApi';

export type User = {
  name: string;
  email: string;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        localStorage.removeItem('user');
        return null;
      }
    } else {
      return null;
    }
  });

  const isAuthenticated = !!user;

  const updateUserData = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const login = async (data: LoginProps): Promise<void> => {
    try {
      const response = await authApi.login(data);
      if (!response.token) {
        throw new Error(response.message || 'Ошибка авторизации');
      }

      localStorage.setItem('token', response.token);

      const user = await authApi.getUserInfo();
      const userData = {
        name: user.email.split('@')[0],
        email: user.email,
      };
      updateUserData(userData);
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = (): void => {
    updateUserData(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
