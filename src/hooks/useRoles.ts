import { useState, useCallback } from 'react';
import * as api from '../lib/api';
import type { Role } from '../types/api';

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.getRoles(token);
      setRoles(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  }, []);

  const getRole = useCallback(async (roleId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.getRole(roleId, token);
  }, []);

  const createRole = useCallback(async (roleData: any) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.createRole(roleData, token);
    await fetchRoles(); // Refresh the list
    return result;
  }, [fetchRoles]);

  const updateRole = useCallback(async (roleId: string, roleData: any) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.updateRole(roleId, roleData, token);
    await fetchRoles();
    return result;
  }, [fetchRoles]);

  const deleteRole = useCallback(async (roleId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.deleteRole(roleId, token);
    await fetchRoles();
    return result;
  }, [fetchRoles]);

  const assignPermissions = useCallback(async (roleId: string, permissionIds: string[]) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.assignPermissionsToRole(roleId, permissionIds, token);
  }, []);

  const getRolePermissions = useCallback(async (roleId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.getRolePermissions(roleId, token);
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
    assignPermissions,
    getRolePermissions,
  };
}
