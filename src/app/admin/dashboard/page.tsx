'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, LogOut, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">Dashboard</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </button>
            <div className="w-px h-4 sm:h-6 bg-gray-300"></div>

            {/* Profile + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-1.5 sm:p-2"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">JD</span>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Welcome to OfficeSync</h2>

          {/* Analytics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">120</span>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">Total Documents</span>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-green-600">45</span>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">Total Users</span>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-purple-600">18</span>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">This Month Documents</span>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">+12%</span>
              <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">Gain % Documents</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              <Link
                href="/admin/approval-detail"
                className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">View Approval Detail</p>
                  <p className="text-xs sm:text-sm text-gray-500">Export Report - Pending</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Link>

              <Link
                href="/admin/documents"
                className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">Manage Documents</p>
                  <p className="text-xs sm:text-sm text-gray-500">View and manage all documents</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Link>

              <Link
                href="/admin/new-document"
                className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">Create New Document</p>
                  <p className="text-xs sm:text-sm text-gray-500">Start a new approval process</p>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Export Report approved by Tommy</p>
                  <p className="text-xs sm:text-sm text-gray-500">2 hours ago</p>
                </div>
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2 shrink-0">
                  Approved
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">New document submitted by LIM</p>
                  <p className="text-xs sm:text-sm text-gray-500">4 hours ago</p>
                </div>
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2 shrink-0">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
