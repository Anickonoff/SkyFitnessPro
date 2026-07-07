import { LoginProps } from '@/services/auth/authtypes';
import { createContext } from 'react';
import { User } from './AuthProvider';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginProps) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
