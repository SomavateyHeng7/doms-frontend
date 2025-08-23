"use client"

import { Bell, ChevronDown, Upload, Eye, Edit, Download, Trash, CheckCircle, Circle, Info } from "lucide-react"
import { useState } from "react"

interface Document {
  id: string
  name: string
  type: string
  status: 'pending' | 'approved' | 'rejected' | 'draft'
  createdBy: string
  selected: boolean
}

const documents: Document[] = [
  { id: "1010110101", name: "Export Report", type: "Report", status: "pending", createdBy: "LIM PROM", selected: true },
  { id: "1010110101", name: "Export Report", type: "Report", status: "approved", createdBy: "LIM PROM", selected: true },
  { id: "1010110101", name: "Export Report", type: "Report", status: "rejected", createdBy: "LIM PROM", selected: true },
  { id: "1010110101", name: "Export Report", type: "Report", status: "pending", createdBy: "LIM PROM", selected: false },
  { id: "1010110101", name: "Export Report", type: "Report", status: "draft", createdBy: "LIM PROM", selected: false },
  { id: "1010110101", name: "Export Report", type: "Report", status: "approved", createdBy: "LIM PROM", selected: false },
  { id: "1010110101", name: "Export Report", type: "Report", status: "rejected", createdBy: "LIM PROM", selected: false },
  { id: "1010110101", name: "Export Report", type: "Report", status: "draft", createdBy: "LIM PROM", selected: false },
]

const statusColors = {
  pending: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  draft: "bg-blue-100 text-blue-800"
}

export default function DocumentsPage() {
  const [documentsList, setDocumentsList] = useState<Document[]>(documents)

  const toggleSelection = (index: number) => {
    const newDocuments = [...documentsList]
    newDocuments[index].selected = !newDocuments[index].selected
    setDocumentsList(newDocuments)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-lg font-medium">Officer - Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold text-gray-900">Documents Table</h2>
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                <Info className="h-3 w-3 text-gray-600" />
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">Manage Document with view, edit, download and delete.</p>

          {/* Documents Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <div className="w-4 h-4"></div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documentsList.map((doc, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleSelection(index)}
                          className="flex items-center justify-center"
                        >
                          {doc.selected ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {doc.createdBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded" title="View">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Edit Docs">
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Download">
                            <Download className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
                            <Trash className="h-4 w-4 text-gray-600" />
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
  )
}
