"use client"

import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react"
import BrokerSidebar from "@/components/broker/BrokerSidebar"

const stats = [
  { label: "Total Requests", value: "12", icon: FileText, iconColor: "text-blue-600", iconBg: "bg-blue-100" },
  { label: "Pending", value: "4", icon: Clock, iconColor: "text-amber-600", iconBg: "bg-amber-100" },
  { label: "Approved", value: "7", icon: CheckCircle2, iconColor: "text-green-600", iconBg: "bg-green-100" },
  { label: "Rejected", value: "1", icon: XCircle, iconColor: "text-red-600", iconBg: "bg-red-100" },
]

export default function BrokerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BrokerSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of your document requests</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(card => (
              <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Requests</h2>
            <div className="text-center py-10">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No recent requests. Submit your first document request.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
