"use client"

import { Eye, Pencil, Download, CheckCircle, Circle } from "lucide-react"
import { useState } from "react"
import { OfficerSidebar, PageHeader, PageTitle } from "@/components/officer"

interface Request {
  id: string
  requester: string
  status: "Approved" | "Pending" | "Rejected"
  approver: string
  requestDate: string
  selected: boolean
}

const requests: Request[] = [
  { id: "1010110101", requester: "1010110101", status: "Approved", approver: "LIM PROM", requestDate: "25-08-2025", selected: true },
  { id: "1010110101", requester: "1010110101", status: "Approved", approver: "LIM PROM", requestDate: "25-08-2025", selected: true },
  { id: "1010110101", requester: "1010110101", status: "Pending", approver: "LIM PROM", requestDate: "25-08-2025", selected: true },
  { id: "1010110101", requester: "1010110101", status: "Rejected", approver: "LIM PROM", requestDate: "25-08-2025", selected: true },
]

const statusColors = {
  Approved: "bg-green-500 text-white",
  Pending: "bg-yellow-500 text-white",
  Rejected: "bg-red-500 text-white",
}

export default function OfficerDashboard() {
  const [requestsList, setRequestsList] = useState<Request[]>(requests)

  const toggleSelection = (index: number) => {
    const newRequests = [...requestsList]
    newRequests[index].selected = !newRequests[index].selected
    setRequestsList(newRequests)
  }

  const toggleAll = () => {
    const allSelected = requestsList.every(r => r.selected)
    setRequestsList(requestsList.map(r => ({ ...r, selected: !allSelected })))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OfficerSidebar />

      <div className="flex-1 flex flex-col">
        <PageHeader />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <PageTitle 
              title="Dashboard" 
              subtitle="Overall Documents Assigned to you, all the approved documents and reject documents"
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center h-32">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Requests */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Requests</h2>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <button onClick={toggleAll}>
                          {requestsList.every(r => r.selected) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requester
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Approver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requestsList.map((request, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <button onClick={() => toggleSelection(index)}>
                            {request.selected ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {request.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {request.requester}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColors[request.status]}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {request.approver}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {request.requestDate}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded text-green-600">
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
