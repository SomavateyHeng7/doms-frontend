import { useState, useEffect } from 'react';
import { getAdminRoles } from '../lib/api';

export function useFetchAdminRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getAdminRoles(token)
        .then((data) => setRoles(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError('No token found');
    }
  }, []);

  return { roles, loading, error };
}