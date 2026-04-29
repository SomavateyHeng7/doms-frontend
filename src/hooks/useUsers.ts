import { useState, useCallback } from 'react';
import * as api from '../lib/api';
import * as cookies from '../lib/cookies';
import type { User } from '../types/api';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    const token = cookies.getAuthToken();
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.getUsers(token);
      setUsers(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (userId: string) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.getUser(userId, token);
  }, []);

  const updateUser = useCallback(async (userId: string, userData: any) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.updateUser(userId, userData, token);
    await fetchUsers(); // Refresh the list
    return result;
  }, [fetchUsers]);

  const suspendUser = useCallback(async (userId: string) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.suspendUser(userId, token);
    await fetchUsers();
    return result;
  }, [fetchUsers]);

  const unsuspendUser = useCallback(async (userId: string) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.unsuspendUser(userId, token);
    await fetchUsers();
    return result;
  }, [fetchUsers]);

  const banUser = useCallback(async (userId: string) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.banUser(userId, token);
    await fetchUsers();
    return result;
  }, [fetchUsers]);

  const assignRoles = useCallback(async (userId: string, roleIds: string[]) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.assignRolesToUser(userId, roleIds, token);
    await fetchUsers();
    return result;
  }, [fetchUsers]);

  const unassignRoles = useCallback(async (userId: string, roleIds: string[]) => {
    const token = cookies.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.unassignRolesFromUser(userId, roleIds, token);
    await fetchUsers();
    return result;
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUser,
    updateUser,
    suspendUser,
    unsuspendUser,
    banUser,
    assignRoles,
    unassignRoles,
  };
}
