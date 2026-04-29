import { useCallback } from 'react';
import * as api from '../lib/api';
import * as cookies from '../lib/cookies';

export function useLogout() {
  const handleLogout = useCallback(async () => {
    const token = cookies.getAuthToken();

    if (token) {
      try {
        await api.logout(token);
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }

    cookies.clearAuth();
    window.location.href = '/auth/login';
  }, []);

  return handleLogout;
}

