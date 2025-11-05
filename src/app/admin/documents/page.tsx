'use client'

import { 
  Bell, ChevronDown, Upload, Eye, Edit, Download, Trash, 
  CheckCircle, Circle, Info, LogOut 
} from "lucide-react"
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
  { id: "1010110102", name: "Export Report", type: "Report", status: "approved", createdBy: "LIM PROM", selected: true },
  { id: "1010110103", name: "Export Report", type: "Report", status: "rejected", createdBy: "LIM PROM", selected: true },
  { id: "1010110104", name: "Export Report", type: "Report", status: "pending", createdBy: "LIM PROM", selected: false },
  { id: "1010110105", name: "Export Report", type: "Report", status: "draft", createdBy: "LIM PROM", selected: false },
  { id: "1010110106", name: "Export Report", type: "Report", status: "approved", createdBy: "LIM PROM", selected: false },
  { id: "1010110107", name: "Export Report", type: "Report", status: "rejected", createdBy: "LIM PROM", selected: false },
  { id: "1010110108", name: "Export Report", type: "Report", status: "draft", createdBy: "LIM PROM", selected: false },
]

const statusColors = {
  pending: "bg-orange-100 text-orange-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  draft: "bg-blue-100 text-blue-800"
}

export default function DocumentsPage() {
  const [documentsList, setDocumentsList] = useState<Document[]>(documents)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleSelection = (index: number) => {
    const newDocuments = [...documentsList]
    newDocuments[index].selected = !newDocuments[index].selected
    setDocumentsList(newDocuments)
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login"
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium truncate">Officer-Dashboard</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
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
      <main className="flex-1 p-4 sm:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">Documents Table</h2>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded-full flex items-center justify-center">
                <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
              </div>
            </div>
            <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Upload Document</span>
              <span className="sm:hidden">Upload</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Manage Document with view, edit, download and delete.</p>

          {/* Documents Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left"></th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Created By</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documentsList.map((doc, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <button onClick={() => toggleSelection(index)}>
                          {doc.selected ? (
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 font-mono">{doc.id}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                        <div className="truncate max-w-[120px] sm:max-w-none">{doc.name}</div>
                        <div className="sm:hidden text-xs text-gray-500 mt-1">{doc.type}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 hidden sm:table-cell">{doc.type}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className={`px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 hidden md:table-cell">{doc.createdBy}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded" title="View">
                            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Edit Docs">
                            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex" title="Download">
                            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
                            <Trash className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
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
