import { useState, useCallback } from 'react';
import * as api from '../lib/api';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.login(email, password);
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: any) => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.register(userData);
      
      // Store token and user data if provided
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
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

