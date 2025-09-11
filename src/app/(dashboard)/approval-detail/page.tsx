"use client"

import { ArrowLeft, Bell, CheckCircle, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ApprovalDetailPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-lg font-medium">Approval Detail</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">JD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Title with Back Button */}
          <div className="flex items-center mb-4">
            <Link href="/dashboard" className="mr-3 p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-900">Export Report</h2>
          </div>

          {/* Approval Timeline Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Timeline</h3>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4">
              {/* Step 1: Request Created */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Request Created</p>
                    <p className="text-sm text-gray-500">Media</p>
                  </div>
                  <span className="text-sm text-gray-500">Jul 15, 2025, 11:12 AM</span>
                </div>
              </div>

              {/* Step 2: Tin - Approved */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tin</p>
                    <p className="text-sm text-gray-500">Approver 1</p>
                  </div>
                  <span className="text-sm text-gray-500">Jul 15, 2025, 11:12 AM</span>
                </div>
              </div>

              {/* Step 3: Tommy - Approved */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tommy</p>
                    <p className="text-sm text-gray-500">Approver 2</p>
                  </div>
                  <span className="text-sm text-gray-500">Jul 15, 2025, 11:12 AM</span>
                </div>
              </div>

              {/* Step 4: Pin - Pending */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pin</p>
                    <p className="text-sm text-gray-500">Approver 3</p>
                  </div>
                  <span className="text-sm text-gray-500">Jul 15, 2025, 11:12 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Details Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Request Name</p>
                <p className="text-sm text-gray-900">Export Report</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Requester</p>
                <p className="text-sm text-gray-900">LIM</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Document ID</p>
                <p className="text-sm text-gray-900">101011001</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Pending
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500 mb-1">Created Time</p>
                <p className="text-sm text-gray-900">Jul 15, 2025, 11:12 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-6 right-6 flex space-x-3">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            Reject
          </button>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Approve
          </button>
        </div>
      </main>
    </div>
  )
}
