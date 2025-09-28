import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService';
import { User } from '../types/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
          console.error('Auth initialization error:', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await authService.login({ email, password });
      localStorage.setItem('token', token);
      setUser(userData);
      toast.success('Welcome back!');
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const { user: userData, token } = await authService.register(data);
      localStorage.setItem('token', token);
      setUser(userData);
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Update failed';
      toast.error(message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};