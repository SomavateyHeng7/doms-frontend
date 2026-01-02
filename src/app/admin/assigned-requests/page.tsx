"use client"

import { Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/shared/PageHeader"
import { useTranslation } from 'react-i18next'

export default function AssignedRequestsPage() {
  const { t } = useTranslation('common')

  const documents = [
    {
      id: 5432,
      category: "Export",
      requesterName: "Arceus"
    },
    {
      id: 5432,
      category: "Export",
      requesterName: "Arceus"
    },
    {
      id: 5432,
      category: "Export",
      requesterName: "Arceus"
    },
    {
      id: 5432,
      category: "Export",
      requesterName: "Arceus"
    },
    {
      id: 5432,
      category: "Export",
      requesterName: "Arceus"
    }
  ]

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title="Assigned Requests" />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Assgined Requests</h2>
              <p className="text-sm text-gray-600 mt-1">Manage Document with view, edit, download and delete.</p>
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documents.map((doc, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Document Icon/Avatar */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-600 hover:text-blue-600" 
                      title="View"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <Link 
                      href="/admin/approval-detail"
                      className="text-gray-600 hover:text-blue-600" 
                      title="Open"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                {/* Document Info */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Document ID:</p>
                    <p className="text-sm font-semibold text-gray-900">{doc.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Category:</p>
                    <p className="text-sm font-semibold text-gray-900">{doc.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Requester Name:</p>
                    <p className="text-sm font-semibold text-gray-900">{doc.requesterName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
