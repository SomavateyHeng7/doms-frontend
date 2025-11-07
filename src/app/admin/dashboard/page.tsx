'use client';

import Link from "next/link";
import { ArrowRight, FileText, Users, TrendingUp, Calendar } from "lucide-react";
import { AdminHeader, StatsCard } from "@/components/admin";
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('common');

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <AdminHeader title={t('nav.dashboard')} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t('common.welcome')}</h2>

          {/* Analytics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <StatsCard
              title={t('dashboard.totalDocuments')}
              value="120"
              icon={FileText}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100"
            />
            <StatsCard
              title={t('dashboard.totalUsers')}
              value="45"
              icon={Users}
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
            />
            <StatsCard
              title={t('dashboard.thisMonthDocuments')}
              value="18"
              icon={Calendar}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100"
            />
            <StatsCard
              title={t('dashboard.gainDocuments')}
              value="+12%"
              icon={TrendingUp}
              iconColor="text-orange-600"
              iconBgColor="bg-orange-100"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('dashboard.quickActions')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              <Link
                href="/admin/approval-detail"
                className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">{t('dashboard.viewApprovalDetail')}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{t('dashboard.exportReportPending')}</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Link>

              <Link
                href="/admin/documents"
                className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">{t('dashboard.manageDocuments')}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{t('dashboard.manageDocumentsDesc')}</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Link>

              <Link
                href="/admin/new-document"
                className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">{t('dashboard.createNewDocument')}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{t('dashboard.createNewDocumentDesc')}</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('dashboard.recentActivity')}</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{t('dashboard.exportApprovedBy')}</p>
                  <p className="text-xs sm:text-sm text-gray-500">2 {t('dashboard.hoursAgo')}</p>
                </div>
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2 shrink-0">
                  {t('dashboard.approved')}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{t('dashboard.newDocumentSubmitted')}</p>
                  <p className="text-xs sm:text-sm text-gray-500">4 {t('dashboard.hoursAgo')}</p>
                </div>
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2 shrink-0">
                  {t('dashboard.pending')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
