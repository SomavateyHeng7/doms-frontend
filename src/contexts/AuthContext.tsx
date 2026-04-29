'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import * as api from '../lib/api';
import * as cookies from '../lib/cookies';
import type { User } from '../types/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from cookies
  useEffect(() => {
    const initAuth = () => {
      const storedToken = cookies.getAuthToken();
      const storedUser = cookies.getAuthUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = useCallback(async (emailOrPhone: string, password: string) => {
    try {
      const response = await api.login(emailOrPhone, password);

      if (response.data?.access_token && response.data?.user) {
        const { access_token, expires_in, user: userData } = response.data;

        // Store in cookies
        cookies.setAuthToken(access_token, expires_in);
        cookies.setAuthUser(userData);

        // Update state
        setToken(access_token);
        setUser(userData);

        // Redirect based on user role
        const userRoles = userData.roles || [];
        if (userRoles.some((role: any) => role.name === 'superadmin')) {
          router.push('/superadmin/dashboard');
        } else if (userRoles.some((role: any) => role.name === 'admin')) {
          router.push('/admin/dashboard');
        } else if (userRoles.some((role: any) => role.name === 'officer')) {
          router.push('/officer/dashboard');
        } else if (userRoles.some((role: any) => role.name === 'broker')) {
          router.push('/broker/dashboard');
        } else {
          router.push('/');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  }, [router]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      const currentToken = token || cookies.getAuthToken();
      
      if (currentToken) {
        // Call backend logout API
        await api.logout(currentToken);
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear cookies and state
      cookies.clearAuth();
      setToken(null);
      setUser(null);
      
      // Redirect to login
      router.push('/login');
    }
  }, [token, router]);

  // Update user in state and cookies
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    cookies.setAuthUser(updatedUser);
  }, []);

  // Refresh user data from API
  const refreshUser = useCallback(async () => {
    try {
      const currentToken = token || cookies.getAuthToken();
      
      if (!currentToken) {
        throw new Error('No authentication token');
      }

      const response = await api.getProfile(currentToken);
      const userData = response.data || response;

      setUser(userData);
      cookies.setAuthUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, logout user
      await logout();
    }
  }, [token, logout]);

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Helper hook to get token
export function useAuthToken() {
  const { token } = useAuth();
  return token || cookies.getAuthToken();
}

// Helper hook to require authentication
export function useRequireAuth(redirectTo: string = '/login') {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  return { isAuthenticated, loading };
}
