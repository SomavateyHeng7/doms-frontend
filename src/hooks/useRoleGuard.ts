'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function useRoleGuard(allowedRoles: string[]) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const hasRole = !!(user?.roles?.some((r: any) => allowedRoles.includes(r.name)));

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }
    if (!hasRole) {
      const roles = user?.roles?.map((r: any) => r.name) ?? [];
      if (roles.includes('superadmin')) router.replace('/superadmin/dashboard');
      else if (roles.includes('admin')) router.replace('/admin/dashboard');
      else if (roles.includes('officer')) router.replace('/officer/dashboard');
      else if (roles.includes('broker')) router.replace('/broker/dashboard');
      else router.replace('/auth/login');
    }
  }, [loading, isAuthenticated, hasRole, user, router]);

  return { loading, isAuthenticated, hasRole };
}
