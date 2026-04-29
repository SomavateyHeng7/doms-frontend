import { useState, useCallback } from 'react';
import * as api from '../lib/api';
import * as cookies from '../lib/cookies';
import type { RegisterRequest } from '../types/api';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.login(email, password);

      if (response.data?.access_token && response.data?.user) {
        cookies.setAuthToken(response.data.access_token, response.data.expires_in);
        cookies.setAuthUser(response.data.user);
      }

      return response;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.register(userData);

      if (response.data?.access_token && response.data?.user) {
        cookies.setAuthToken(response.data.access_token, response.data.expires_in);
        cookies.setAuthUser(response.data.user);
      }

      return response;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    register,
    loading,
    error,
  };
}

