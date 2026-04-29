import { useState, useCallback } from 'react';
import * as api from '../lib/api';
import * as cookies from '../lib/cookies';
import type { Permission } from '../types/api';

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = useCallback(async () => {
    const token = cookies.getAuthToken();
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.getPermissions(token);
      setPermissions(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    permissions,
    loading,
    error,
    fetchPermissions,
  };
}
