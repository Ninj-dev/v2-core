export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
  preferences: {
    theme: 'light' | 'dark';
    defaultFramework: 'react' | 'vue' | 'angular' | 'vanilla';
    autoSave: boolean;
  };
  isVerified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}