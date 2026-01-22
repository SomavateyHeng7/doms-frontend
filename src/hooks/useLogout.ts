import { useCallback } from 'react';
import * as api from '../lib/api';

export function useLogout() {
  const handleLogout = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwt');
      
      // Call logout API if token exists
      if (token) {
        try {
          await api.logout(token);
        } catch (error) {
          console.error('Logout API call failed:', error);
        }
      }

      // Clear local storage and redirect
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
  }, []);

  return handleLogout;
}

