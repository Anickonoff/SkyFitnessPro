import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

const authContext = useContext(AuthContext);
if (!authContext) {
  throw new Error('AuthContext must be used within AuthProvider');
}

const { user, isAuthenticated, login, logout } = authContext;
