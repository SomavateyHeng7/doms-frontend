"use client"

import { ArrowLeft, Bell, CheckCircle, Clock, Users, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function ApprovalDetailPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login"
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#ededed]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">Approval Details</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
            <LanguageSwitcher />
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
      <main className="flex-1 p-4 sm:p-6 bg-gray-50 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Page Title with Back Button */}
          <div className="flex items-center mb-3 sm:mb-4">
            <Link href="/admin/dashboard" className="mr-2 sm:mr-3 p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </Link>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">Export Report</h2>
          </div>

          {/* Approval Timeline Card */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Approval Timeline</h3>
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Progress</p>

            {/* Progress Bar */}
            <div className="relative w-full h-1.5 sm:h-2 bg-gray-200 rounded-full mb-8 sm:mb-12">
              <div
                className="absolute top-0 left-0 h-1.5 sm:h-2 bg-blue-500 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>

            {/* Steps */}
            <div className="flex justify-between relative -mt-6 sm:-mt-10">
              {/* Step 1: Request Created */}
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <Users className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <p className="text-xs sm:text-sm font-medium mt-1 sm:mt-2">Request Created</p>
                <p className="text-xs text-gray-500 hidden sm:block">Media</p>
                <p className="text-xs text-gray-400 hidden sm:block">Jul 15, 2025, 11:12 AM</p>
              </div>

        {/* Step 2: Tin */}
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 sm:h-5 sm:w-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium mt-1 sm:mt-2">Tin</p>
          <p className="text-xs text-gray-500 hidden sm:block">Approver 1</p>
          <p className="text-xs text-gray-400 hidden sm:block">Jul 15, 2025, 11:12 AM</p>
        </div>

        {/* Step 3: Tommy */}
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 sm:h-5 sm:w-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium mt-1 sm:mt-2">Tommy</p>
          <p className="text-xs text-gray-500 hidden sm:block">Approver 2</p>
          <p className="text-xs text-gray-400 hidden sm:block">Jul 15, 2025, 11:12 AM</p>
        </div>

        {/* Step 4: Pin */}
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-yellow-400 text-white">
            <Clock className="h-3 w-3 sm:h-5 sm:w-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium mt-1 sm:mt-2">Pin</p>
          <p className="text-xs text-gray-500 hidden sm:block">Approver 3</p>
          <p className="text-xs text-gray-400 hidden sm:block">Jul 15, 2025, 11:12 AM</p>
        </div>
      </div>
    </div>

          {/* Request Details Card */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Request Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">Request Name</p>
                <p className="text-sm sm:text-base text-gray-900">Export Report</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">Requester</p>
                <p className="text-sm sm:text-base text-gray-900">LIM</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">Document ID</p>
                <p className="text-sm sm:text-base text-gray-900">101011001</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">Status</p>
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Pending
                </span>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Created Time</p>
                <p className="text-sm sm:text-base text-gray-900">Jul 15, 2025, 11:12 AM</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6 sm:mt-8">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              Reject
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Approve
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
