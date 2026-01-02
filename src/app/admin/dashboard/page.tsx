'use client';

import Link from "next/link";
import { ArrowRight, FileText, Users, TrendingUp, Calendar, Eye, Edit, Download, Trash2 } from "lucide-react";
import { StatsCard, StatusBadge } from "@/components/admin";
import PageHeader from "@/components/shared/PageHeader";
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('common');

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={t('nav.dashboard')} />

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

          {/* Recent Requests Table */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Requests</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approver</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <StatusBadge status="approved" size="sm" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">LIM PROM</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">25-08-2025</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-blue-600" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-green-600" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <StatusBadge status="approved" size="sm" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">LIM PROM</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">25-08-2025</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-blue-600" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-green-600" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <StatusBadge status="pending" size="sm" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">LIM PROM</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">25-08-2025</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-blue-600" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-green-600" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">1010110101</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <StatusBadge status="rejected" size="sm" />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">LIM PROM</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">25-08-2025</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-blue-600" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-green-600" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
