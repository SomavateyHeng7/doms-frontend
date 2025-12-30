"use client"

import { Eye, ExternalLink } from "lucide-react"
import { OfficerSidebar, PageHeader, PageTitle } from "@/components/officer"

interface AssignedRequest {
  documentId: string
  category: string
  requesterName: string
}

const requests: AssignedRequest[] = [
  { documentId: "5432", category: "Export", requesterName: "Arceus" },
  { documentId: "5432", category: "Export", requesterName: "Arceus" },
  { documentId: "5432", category: "Export", requesterName: "Arceus" },
  { documentId: "5432", category: "Export", requesterName: "Arceus" },
  { documentId: "5432", category: "Export", requesterName: "Arceus" },
]

export default function AssignedRequests() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <OfficerSidebar />

      <div className="flex-1 flex flex-col">
        <PageHeader title="Assigned Requests" />

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <PageTitle 
              title="Assgined Requests" 
              subtitle="Manage document with view, edit, download and delete."
            />

            {/* Request Cards */}
            <div className="space-y-4">
              {requests.map((request, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow relative"
                >
                  {/* Action Icons */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ExternalLink className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="pr-24">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-900 font-medium">Document ID: </span>
                        <span className="text-sm text-gray-900">{request.documentId}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-900 font-medium">Category: </span>
                        <span className="text-sm text-gray-900">{request.category}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Requester Name: </span>
                        <span className="text-xs text-gray-500">{request.requesterName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
