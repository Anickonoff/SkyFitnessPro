import { createContext } from 'react';

type AuthModalContextType = {
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const AuthModalContext = createContext<AuthModalContextType | null>(
  null,
);
