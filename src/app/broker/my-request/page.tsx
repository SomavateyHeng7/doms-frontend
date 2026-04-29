"use client"

import { FileText, Plus } from "lucide-react"
import BrokerSidebar from "@/components/broker/BrokerSidebar"

export default function MyRequestPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrokerSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
              <p className="text-sm text-gray-500 mt-1">Documents you have submitted for approval</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Request
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-900 font-medium text-sm">No requests yet</p>
            <p className="text-gray-500 text-xs mt-1">Submit your first document request to get started.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
