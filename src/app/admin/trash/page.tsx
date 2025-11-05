"use client"

import { Bell, ChevronDown, Trash2, RotateCcw, Eye, Download, Calendar, User, FileText, Search, Filter, LogOut } from "lucide-react"
import { useState } from "react"

interface TrashDocument {
  id: string
  name: string
  type: string
  deletedBy: string
  deletedAt: string
  originalSize: string
  originalLocation: string
  canRestore: boolean
}

const trashDocuments: TrashDocument[] = [
  {
    id: "DOC-001",
    name: "Old Export Report",
    type: "Report",
    deletedBy: "John Doe",
    deletedAt: "2024-01-15",
    originalSize: "2.5 MB",
    originalLocation: "/documents/reports",
    canRestore: true
  },
  {
    id: "DOC-002",
    name: "Draft Contract",
    type: "Contract",
    deletedBy: "Jane Smith",
    deletedAt: "2024-01-20",
    originalSize: "1.8 MB",
    originalLocation: "/documents/contracts",
    canRestore: true
  },
  {
    id: "DOC-003",
    name: "Outdated Policy",
    type: "Policy",
    deletedBy: "Mike Johnson",
    deletedAt: "2024-02-01",
    originalSize: "3.2 MB",
    originalLocation: "/documents/policies",
    canRestore: false
  },
  {
    id: "DOC-004",
    name: "Test Document",
    type: "Test",
    deletedBy: "Sarah Wilson",
    deletedAt: "2024-02-10",
    originalSize: "0.5 MB",
    originalLocation: "/documents/tests",
    canRestore: true
  },
  {
    id: "DOC-005",
    name: "Duplicate Invoice",
    type: "Invoice",
    deletedBy: "David Brown",
    deletedAt: "2024-02-15",
    originalSize: "1.1 MB",
    originalLocation: "/documents/invoices",
    canRestore: true
  },
  {
    id: "DOC-006",
    name: "Expired Certificate",
    type: "Certificate",
    deletedBy: "Lisa Davis",
    deletedAt: "2024-02-20",
    originalSize: "0.8 MB",
    originalLocation: "/documents/certificates",
    canRestore: false
  }
]

export default function TrashPage() {
  const [trashList, setTrashList] = useState<TrashDocument[]>(trashDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredTrash = trashList.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.deletedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleRestore = (id: string) => {
    setTrashList(prev => prev.filter(doc => doc.id !== id))
  }

  const handlePermanentDelete = (id: string) => {
    setTrashList(prev => prev.filter(doc => doc.id !== id))
  }

  const handleEmptyTrash = () => {
    setTrashList([])
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
   <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium truncate">Trash Documents</h1>
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
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Trash Bin</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Recover or permanently delete documents</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleEmptyTrash}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Empty Trash</span>
                <span className="sm:hidden">Empty</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">{trashList.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Trash2 className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Can Restore</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {trashList.filter(doc => doc.canRestore).length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <RotateCcw className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Size</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {trashList.reduce((sum, doc) => {
                      const size = parseFloat(doc.originalSize.split(' ')[0])
                      return sum + size
                    }, 0).toFixed(1)} MB
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Document Types</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {Array.from(new Set(trashList.map(doc => doc.type))).length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search deleted documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-2 sm:px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="Report">Reports</option>
                  <option value="Contract">Contracts</option>
                  <option value="Policy">Policies</option>
                  <option value="Invoice">Invoices</option>
                  <option value="Certificate">Certificates</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trash Documents Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Type
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Deleted By
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Deleted Date
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Size
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrash.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">{doc.name}</div>
                          <div className="text-xs text-gray-500">ID: {doc.id}</div>
                          <div className="sm:hidden text-xs text-gray-500 mt-1">{doc.type}</div>
                          <div className="text-xs text-gray-400 mt-1 hidden sm:block">Location: {doc.originalLocation}</div>
                          <div className="md:hidden text-xs text-gray-500 mt-1">By: {doc.deletedBy}</div>
                          <div className="md:hidden text-xs text-gray-500">{doc.deletedAt}</div>
                          <div className="lg:hidden text-xs text-gray-500">{doc.originalSize}</div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                        <div className="flex items-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                            <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-900 truncate">{doc.deletedBy}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                          {doc.deletedAt}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">
                        {doc.originalSize}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded" title="Preview">
                            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex" title="Download">
                            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
                          </button>
                          {doc.canRestore && (
                            <button 
                              onClick={() => handleRestore(doc.id)}
                              className="p-1 hover:bg-green-100 rounded" 
                              title="Restore"
                            >
                              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                            </button>
                          )}
                          <button 
                            onClick={() => handlePermanentDelete(doc.id)}
                            className="p-1 hover:bg-red-100 rounded" 
                            title="Delete Permanently"
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredTrash.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Trash2 className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents in trash</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                {trashList.length === 0 ? "Your trash is empty." : "No documents match your search criteria."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
