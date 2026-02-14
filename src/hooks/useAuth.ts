import { useState, useEffect, useCallback } from 'react';
import * as cookies from '../lib/cookies';
import type { User } from '../types/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from cookies
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = cookies.getAuthToken();
      const storedUser = cookies.getAuthUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((token: string, user: User, expiresIn?: number) => {
    cookies.setAuthToken(token, expiresIn);
    cookies.setAuthUser(user);
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    cookies.clearAuth();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    cookies.setAuthUser(updatedUser);
    setUser(updatedUser);
  }, []);

  const getToken = useCallback(() => {
    return token || cookies.getAuthToken();
  }, [token]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    getToken,
  };
}
