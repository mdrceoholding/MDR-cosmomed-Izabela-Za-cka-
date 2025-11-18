import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Session } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (token, user) => {
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface SessionState {
  currentSession: Session | null;
  isSessionActive: boolean;
  startSession: (session: Session) => void;
  updateSession: (session: Partial<Session>) => void;
  endSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentSession: null,
  isSessionActive: false,
  startSession: (session) => set({ currentSession: session, isSessionActive: true }),
  updateSession: (sessionData) =>
    set((state) => ({
      currentSession: state.currentSession
        ? { ...state.currentSession, ...sessionData }
        : null,
    })),
  endSession: () => set({ currentSession: null, isSessionActive: false }),
}));

interface UIState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isDoNotDisturb: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setDoNotDisturb: (value: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      isSidebarOpen: true,
      isDoNotDisturb: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setDoNotDisturb: (value) => set({ isDoNotDisturb: value }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
