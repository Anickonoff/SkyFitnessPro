'use client';

import Header from '@/components/Header/Header';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <>
        <Header privatePage={true} />
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header privatePage={true} />
        <div className="flex items-center justify-center h-screen">
          <p>Для доступа к данной странице необходимо авторизоваться</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header privatePage={true} />
      {children}
    </>
  );
};

export default AuthLayout;
