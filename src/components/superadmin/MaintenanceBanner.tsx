'use client';

import Link from 'next/link';
import { Wrench, X } from 'lucide-react';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';

export function MaintenanceBanner() {
  const { isSuperAdmin, config, toggleMaintenance } = useSuperAdmin();

  if (!isSuperAdmin || !config.maintenance.enabled) return null;

  return (
    <div className="bg-amber-500 text-amber-950 px-4 py-2.5 flex items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-2 min-w-0">
        <Wrench className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold truncate">
          MAINTENANCE MODE ACTIVE — Regular users are redirected to the maintenance page
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          href="/superadmin-config"
          className="text-xs font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
        >
          Configure
        </Link>
        <button
          onClick={toggleMaintenance}
          className="flex items-center gap-1 bg-amber-900/20 hover:bg-amber-900/40 px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap"
        >
          <X className="w-3 h-3" />
          Disable
        </button>
      </div>
    </div>
  );
}
