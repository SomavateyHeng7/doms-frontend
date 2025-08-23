"use client"

import { Bell, ArrowLeft, CheckCircle, XCircle, MessageCircle, Clock, User, FileText } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center h-16 px-8 text-gray-600 text-lg font-medium bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>Approval Detail</span>
          <span className="text-gray-400">→</span>
          <span className="font-normal text-gray-700">Comments</span>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Topbar */}
        <div className="flex items-center justify-between h-16 px-8 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800">Document Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors">
              <Image src="/image/user.png" alt="User" width={40} height={40} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title and Back Button */}
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-white rounded-full transition-all duration-200 shadow-sm">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Export Report</h2>
                <p className="text-gray-500 text-sm mt-1">Document approval and review process</p>
              </div>
            </div>
            
            {/* Request Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Request Information</h3>
                <p className="text-gray-600 text-sm">Review the document details and current status</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-700">Request Name:</span>
                      </div>
                      <span className="text-gray-900 font-semibold">Export Report</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-700">Requester:</span>
                      </div>
                      <span className="text-gray-900">LIM</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-700">Document ID:</span>
                      </div>
                      <span className="text-gray-900 font-mono">101011001</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-gray-700">Status:</span>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-gray-700">Created Time:</span>
                      </div>
                      <span className="text-gray-900">Jul 15, 2025, 11:12 AM</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-700">Comments:</span>
                      </div>
                      <span className="text-gray-900">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Comments</h3>
                <p className="text-gray-600 text-sm">Feedback and discussion about this document</p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {/* Comment 1 */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-blue-700 hover:underline cursor-pointer">Sovatharo Prom</span>
                          <p className="text-xs text-gray-500">Reviewer</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full">Jul 15, 2025, 11:25 AM</span>
                    </div>
                    <div className="text-gray-700 leading-relaxed">
                      The Document need to fix the ID and the letter
                    </div>
                  </div>
                  
                  {/* Comment 2 */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Lim Prom</span>
                          <p className="text-xs text-gray-500">Requester</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full">Jul 15, 2025, 11:25 AM</span>
                    </div>
                    <div className="text-gray-700 leading-relaxed">
                      I have already fix the document ID and the letter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="bg-white border-t border-gray-100 px-8 py-6">
          <div className="max-w-4xl mx-auto flex justify-end gap-4">
            <button className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-red-200 text-red-700 bg-red-50 font-semibold text-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200">
              <XCircle className="w-5 h-5" />
              Reject
            </button>
            <button className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-green-200 text-white bg-green-600 font-semibold text-lg hover:bg-green-700 hover:border-green-300 transition-all duration-200 shadow-lg">
              <CheckCircle className="w-5 h-5" />
              Approve
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
