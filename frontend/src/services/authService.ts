import api from './api';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data.user;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/auth/me', userData);
    return response.data.user;
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await api.post('/auth/change-password', data);
  }

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  }

  async resetPassword(data: { token: string; newPassword: string }): Promise<void> {
    await api.post('/auth/reset-password', data);
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();