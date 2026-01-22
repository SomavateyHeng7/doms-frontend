import { useState, useCallback } from 'react';
import * as api from '../lib/api';
import type { Pipeline } from '../types/api';

export function usePipelines() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPipelines = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await api.getPipelines(token);
      setPipelines(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pipelines');
    } finally {
      setLoading(false);
    }
  }, []);

  const getPipeline = useCallback(async (pipelineId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.getPipeline(pipelineId, token);
  }, []);

  const createPipeline = useCallback(async (pipelineData: any) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.createPipeline(pipelineData, token);
    await fetchPipelines(); // Refresh the list
    return result;
  }, [fetchPipelines]);

  const updatePipeline = useCallback(async (pipelineId: string, pipelineData: any) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.updatePipeline(pipelineId, pipelineData, token);
    await fetchPipelines();
    return result;
  }, [fetchPipelines]);

  const deletePipeline = useCallback(async (pipelineId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const result = await api.deletePipeline(pipelineId, token);
    await fetchPipelines();
    return result;
  }, [fetchPipelines]);

  const assignUser = useCallback(async (pipelineId: string, userId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.assignUserToPipeline(pipelineId, userId, token);
  }, []);

  const unassignUser = useCallback(async (pipelineId: string, userId: string) => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    return await api.unassignUserFromPipeline(pipelineId, userId, token);
  }, []);

  return {
    pipelines,
    loading,
    error,
    fetchPipelines,
    getPipeline,
    createPipeline,
    updatePipeline,
    deletePipeline,
    assignUser,
    unassignUser,
  };
}
