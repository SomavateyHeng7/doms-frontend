"use client"

import { History } from "lucide-react"
import BrokerSidebar from "@/components/broker/BrokerSidebar"

export default function RequestHistoryPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrokerSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Request History</h1>
            <p className="text-sm text-gray-500 mt-1">All your past document requests</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-900 font-medium text-sm">No history available yet</p>
            <p className="text-gray-500 text-xs mt-1">Your completed requests will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
