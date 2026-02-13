import { useState, useCallback } from 'react';
import * as api from '../lib/api';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.login(email, password);
      
      // Store token and user data - backend returns { message, data: { access_token, user } }
      if (response.data?.access_token) {
        localStorage.setItem('jwt', response.data.access_token);
      }
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response;
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
      const response = await api.register(userData);
      
      // Store token and user data - backend returns { message, data: { access_token, user } }
      if (response.data?.access_token) {
        localStorage.setItem('jwt', response.data.access_token);
      }
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
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

