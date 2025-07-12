import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuthData: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setAuthData: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    }),
}));
