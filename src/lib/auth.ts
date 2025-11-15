import { User, UserRole } from '../types';
import { mockMembers } from './mockData';

// Mock authentication context
export const AUTH_STORAGE_KEY = 'tein_auth_user';

export const login = (email: string, password: string): User | null => {
  // In a real app, this would validate against a backend
  // For demo purposes, we'll find user by email
  const user = mockMembers.find(m => m.email === email);
  
  if (user && password === 'demo123') {
    // Check if user is pending approval
    if (user.status === 'pending') {
      return { ...user, status: 'pending' } as User; // Return user with pending status
    }
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (user: User | null, roles: UserRole[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};
