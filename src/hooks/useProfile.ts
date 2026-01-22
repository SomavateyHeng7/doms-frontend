import { useState, useCallback } from 'react';
import * as api from '../lib/api';
import type { User } from '../types/api';

export function useProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.getProfile(token);
      setProfile(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData: any) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.updateProfile(userData, token);
    await fetchProfile(); // Refresh profile
    return result;
  }, [fetchProfile]);

  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.changePassword(oldPassword, newPassword, token);
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
  };
}
