import { useState, useEffect } from 'react';
import { getRoles } from '../lib/api';
import * as cookies from '../lib/cookies';
import type { Role } from '../types/api';

export function useFetchAdminRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = cookies.getAuthToken();
    if (token) {
      getRoles(token)
        .then((data) => setRoles(data.data || data))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError('No token found');
    }
  }, []);

  return { roles, loading, error };
}
