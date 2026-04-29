import { useEffect, useState } from 'react';
import { getProfile } from './api';
import { getAuthToken } from './cookies';
import type { User } from '../types/api';

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getProfile(token)
      .then((data) => setUser(data.data || data))
      .catch(() => setError('Failed to load user'))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
