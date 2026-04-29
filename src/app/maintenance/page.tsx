'use client';

import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Wrench, Clock, ArrowLeft } from 'lucide-react';

export default function MaintenancePage() {
  const { isSuperAdmin, config } = useSuperAdmin();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSuperAdmin) {
      router.replace('/admin/dashboard');
    } else if (!config.maintenance.enabled) {
      router.replace(isAuthenticated ? '/admin/dashboard' : '/login');
    }
  }, [isSuperAdmin, config.maintenance.enabled, isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
              <Wrench className="w-14 h-14 text-amber-400" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500" />
            </span>
          </div>
        </div>

        {/* Title and message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">System Maintenance</h1>
          <p className="text-gray-400 leading-relaxed">
            {config.maintenance.message}
          </p>
        </div>

        {/* Estimated end time */}
        {config.maintenance.estimatedEndTime && (
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-4 py-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>
              Estimated back:{' '}
              {new Date(config.maintenance.estimatedEndTime).toLocaleString()}
            </span>
          </div>
        )}

        {/* Info box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-2">
          <p className="text-sm font-semibold text-white">What&apos;s happening?</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Our team is performing scheduled maintenance to improve system performance and
            reliability. Your data is safe. Authorized personnel have been notified and will
            restore access as soon as possible.
          </p>
        </div>

        {/* Back link */}
        <button
          onClick={() => router.push('/login')}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>
      </div>
    </div>
  );
}
