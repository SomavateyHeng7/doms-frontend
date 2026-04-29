'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedEndTime: string;
}

export interface OrganizationConfig {
  name: string;
  requireBossApprovalForAll: boolean;
  notifyHeadOnSubmission: boolean;
  notifyHeadOnApproval: boolean;
  notifyHeadOnRejection: boolean;
  autoEscalateDays: number;
}

export interface ApprovalFlowConfig {
  requireAllApprovers: boolean;
  maxLevels: number;
  allowSelfApproval: boolean;
}

export interface NotificationConfig {
  emailEnabled: boolean;
  inAppEnabled: boolean;
  notifyOnDocumentSubmit: boolean;
  notifyOnDocumentApprove: boolean;
  notifyOnDocumentReject: boolean;
}

export interface SystemConfig {
  maintenance: MaintenanceConfig;
  organization: OrganizationConfig;
  approvalFlow: ApprovalFlowConfig;
  notifications: NotificationConfig;
}

interface SuperAdminContextType {
  isSuperAdmin: boolean;
  config: SystemConfig;
  updateMaintenance: (updates: Partial<MaintenanceConfig>) => void;
  updateOrganization: (updates: Partial<OrganizationConfig>) => void;
  updateApprovalFlow: (updates: Partial<ApprovalFlowConfig>) => void;
  updateNotifications: (updates: Partial<NotificationConfig>) => void;
  toggleMaintenance: () => void;
}

const defaultConfig: SystemConfig = {
  maintenance: {
    enabled: false,
    message: 'The system is currently under scheduled maintenance. We will be back shortly.',
    estimatedEndTime: '',
  },
  organization: {
    name: 'OfficeSync',
    requireBossApprovalForAll: false,
    notifyHeadOnSubmission: true,
    notifyHeadOnApproval: true,
    notifyHeadOnRejection: true,
    autoEscalateDays: 3,
  },
  approvalFlow: {
    requireAllApprovers: true,
    maxLevels: 3,
    allowSelfApproval: false,
  },
  notifications: {
    emailEnabled: true,
    inAppEnabled: true,
    notifyOnDocumentSubmit: true,
    notifyOnDocumentApprove: true,
    notifyOnDocumentReject: true,
  },
};

const STORAGE_KEY = 'doms_system_config';

const SuperAdminContext = createContext<SuperAdminContextType | undefined>(undefined);

export function SuperAdminProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);

  const isSuperAdmin = !!(user?.roles?.some((r: any) => r.name === 'superadmin' || r.role_name === 'superadmin'));

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfig(prev => ({
          maintenance: { ...prev.maintenance, ...(parsed.maintenance ?? {}) },
          organization: { ...prev.organization, ...(parsed.organization ?? {}) },
          approvalFlow: { ...prev.approvalFlow, ...(parsed.approvalFlow ?? {}) },
          notifications: { ...prev.notifications, ...(parsed.notifications ?? {}) },
        }));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const persist = useCallback((next: SystemConfig) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const updateMaintenance = useCallback((updates: Partial<MaintenanceConfig>) => {
    setConfig(prev => {
      const next = { ...prev, maintenance: { ...prev.maintenance, ...updates } };
      persist(next);
      return next;
    });
  }, [persist]);

  const updateOrganization = useCallback((updates: Partial<OrganizationConfig>) => {
    setConfig(prev => {
      const next = { ...prev, organization: { ...prev.organization, ...updates } };
      persist(next);
      return next;
    });
  }, [persist]);

  const updateApprovalFlow = useCallback((updates: Partial<ApprovalFlowConfig>) => {
    setConfig(prev => {
      const next = { ...prev, approvalFlow: { ...prev.approvalFlow, ...updates } };
      persist(next);
      return next;
    });
  }, [persist]);

  const updateNotifications = useCallback((updates: Partial<NotificationConfig>) => {
    setConfig(prev => {
      const next = { ...prev, notifications: { ...prev.notifications, ...updates } };
      persist(next);
      return next;
    });
  }, [persist]);

  const toggleMaintenance = useCallback(() => {
    setConfig(prev => {
      const next = { ...prev, maintenance: { ...prev.maintenance, enabled: !prev.maintenance.enabled } };
      persist(next);
      return next;
    });
  }, [persist]);

  return (
    <SuperAdminContext.Provider value={{
      isSuperAdmin,
      config,
      updateMaintenance,
      updateOrganization,
      updateApprovalFlow,
      updateNotifications,
      toggleMaintenance,
    }}>
      {children}
    </SuperAdminContext.Provider>
  );
}

export function useSuperAdmin() {
  const ctx = useContext(SuperAdminContext);
  if (!ctx) throw new Error('useSuperAdmin must be used within SuperAdminProvider');
  return ctx;
}
