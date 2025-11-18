import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, UserStatus, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';
import CryptoJS from 'crypto-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by email
    const foundUser = mockUsers.find(u => u.email === email);

    if (!foundUser) {
      setLoading(false);
      return false;
    }

    // In production, you would verify hashed password
    // For demo, we'll just check if password is not empty
    if (password.length < 4) {
      setLoading(false);
      return false;
    }

    // Create session token (in production, this would come from backend)
    const token = CryptoJS.SHA256(email + Date.now()).toString();

    // Update last login
    const updatedUser = {
      ...foundUser,
      lastLogin: new Date()
    };

    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(updatedUser));

    setUser(updatedUser);
    setLoading(false);
    return true;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    const emailExists = mockUsers.some(u => u.email === userData.email);

    if (emailExists) {
      setLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      password: CryptoJS.SHA256(userData.password || '').toString(), // Hash password
      role: UserRole.VIEWER, // Default role for new registrations
      position: userData.position,
      company: userData.company,
      phone: userData.phone,
      avatar: userData.avatar,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      lastLogin: new Date()
    };

    // Create session token
    const token = CryptoJS.SHA256(newUser.email + Date.now()).toString();

    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(newUser));

    // Add to mock users (in production, this would be saved to database)
    mockUsers.push(newUser);

    setUser(newUser);
    setLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
