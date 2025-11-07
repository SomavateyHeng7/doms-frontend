"use client"

import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function TestTranslations() {
  const { t, i18n } = useTranslation('common')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Language Switcher */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Language Testing Page
            </h1>
            <LanguageSwitcher />
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>Current Language: <strong>{i18n.language}</strong></span>
            <span>|</span>
            <span>Change language using the dropdown above</span>
          </div>
        </div>

        {/* Translation Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Navigation Translations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Navigation
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Dashboard:</span>
                <span className="font-medium">{t('nav.dashboard')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Documents:</span>
                <span className="font-medium">{t('nav.documents')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Pipelines:</span>
                <span className="font-medium">{t('nav.pipelines')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Roles:</span>
                <span className="font-medium">{t('nav.roles')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Users:</span>
                <span className="font-medium">{t('nav.users')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Trash:</span>
                <span className="font-medium">{t('nav.trash')}</span>
              </li>
            </ul>
          </div>

          {/* Dashboard Translations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Dashboard
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Welcome:</span>
                <span className="font-medium">{t('common.welcome')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Total Documents:</span>
                <span className="font-medium">{t('dashboard.totalDocuments')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Total Users:</span>
                <span className="font-medium">{t('dashboard.totalUsers')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Quick Actions:</span>
                <span className="font-medium">{t('dashboard.quickActions')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Recent Activity:</span>
                <span className="font-medium">{t('dashboard.recentActivity')}</span>
              </li>
            </ul>
          </div>

          {/* Auth Translations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Authentication
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Login:</span>
                <span className="font-medium">{t('auth.login')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Register:</span>
                <span className="font-medium">{t('auth.register')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{t('auth.email')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Password:</span>
                <span className="font-medium">{t('auth.password')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Full Name:</span>
                <span className="font-medium">{t('auth.fullName')}</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons Test */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Action Buttons Test
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                {t('auth.login')}
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                {t('common.create')}
              </button>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-blue-900 font-semibold mb-2">Testing Instructions:</h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-1">
            <li>Use the language switcher in the top-right corner</li>
            <li>Switch between English (🇺🇸) and Khmer (🇰🇭)</li>
            <li>All text should change immediately after switching</li>
            <li>The current language should be displayed above</li>
            <li>Check the dashboard at <a href="/admin/dashboard" className="underline">/admin/dashboard</a> to see live translations</li>
          </ol>
        </div>
      </div>
    </div>
  )
}