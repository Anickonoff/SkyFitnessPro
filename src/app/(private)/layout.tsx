'use client';

import Header from '@/components/Header/Header';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isAuthenticated } = useAuth();
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
