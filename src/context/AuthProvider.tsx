'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { CourseProgress, LoginProps } from '@/types/authtypes';
import authApi from '@/services/auth/authApi';
import { setLogoutHandler } from './authEvents';

export type User = {
  name: string;
  email: string;
  courseProgress: CourseProgress[];
  selectedCourses: string[];
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // useEffect(() => {
  //   const raw = localStorage.getItem('user');
  //   if (raw) {
  //     try {
  //       const parsed = JSON.parse(raw);

  //       setUser(parsed);
  //     } catch {
  //       localStorage.removeItem('user');
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const raw = localStorage.getItem('token');
    if (!raw) return;
    setToken(raw);
    refreshUserData();
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

  const refreshUserData = async () => {
    const user = await authApi.getUserInfo();
    const userData = {
      name: user.user.email.split('@')[0],
      email: user.user.email,
      selectedCourses: user.user.selectedCourses,
      courseProgress: user.user.courseProgress,
    };
    updateUserData(userData);
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
      updateToken(response.token);
      await refreshUserData();
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = (): void => {
    updateUserData(null);
    updateToken(null);
  };

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
