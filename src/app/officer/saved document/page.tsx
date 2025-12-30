"use client"

import { Eye, Download, Trash2, Bookmark, FileText } from "lucide-react"
import { useState } from "react"
import { OfficerSidebar, PageHeader, PageTitle } from "@/components/officer"

interface SavedDocument {
  id: string
  name: string
  category: string
  savedDate: string
  fileSize: string
  type: string
}

const savedDocuments: SavedDocument[] = [
  { 
    id: "DOC001", 
    name: "Export License Agreement", 
    category: "Export", 
    savedDate: "28-12-2024",
    fileSize: "2.4 MB",
    type: "PDF"
  },
  { 
    id: "DOC002", 
    name: "Import Clearance Certificate", 
    category: "Import", 
    savedDate: "27-12-2024",
    fileSize: "1.8 MB",
    type: "PDF"
  },
  { 
    id: "DOC003", 
    name: "Trade Agreement Form", 
    category: "Trade", 
    savedDate: "25-12-2024",
    fileSize: "3.1 MB",
    type: "PDF"
  },
  { 
    id: "DOC004", 
    name: "Export Report Q4 2024", 
    category: "Export", 
    savedDate: "24-12-2024",
    fileSize: "4.5 MB",
    type: "PDF"
  },
  { 
    id: "DOC005", 
    name: "Customs Declaration", 
    category: "Customs", 
    savedDate: "22-12-2024",
    fileSize: "1.2 MB",
    type: "PDF"
  },
]

export default function SavedDocuments() {
  const [documents, setDocuments] = useState<SavedDocument[]>(savedDocuments)

  const handleRemove = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const handleView = (id: string) => {
    console.log('View document:', id)
  }

  const handleDownload = (id: string) => {
    console.log('Download document:', id)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OfficerSidebar />

      <div className="flex-1 flex flex-col">
        <PageHeader title="Saved Documents" />

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <PageTitle 
              title="Saved Documents" 
              subtitle="Access your bookmarked documents for quick reference and download."
            />

            {/* Stats */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Total Saved: <span className="font-semibold text-gray-900">{documents.length}</span> {documents.length === 1 ? 'document' : 'documents'}
                </span>
              </div>
            </div>

            {/* Document Cards */}
            {documents.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bookmark className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved documents</h3>
                <p className="text-sm text-gray-500">Documents you bookmark will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Left Section - Document Icon and Info */}
                        <div className="flex gap-4 flex-1">
                          <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-7 h-7 text-blue-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
                              {doc.name}
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                              <div>
                                <span className="text-gray-500">ID: </span>
                                <span className="text-gray-900 font-mono">{doc.id}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Category: </span>
                                <span className="text-gray-900">{doc.category}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Type: </span>
                                <span className="text-gray-900">{doc.type}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Size: </span>
                                <span className="text-gray-900">{doc.fileSize}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-xs text-gray-400">Saved on: </span>
                              <span className="text-xs text-gray-500">{doc.savedDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Action Buttons */}
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => handleView(doc.id)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group/btn"
                            title="View document"
                          >
                            <Eye className="w-5 h-5 text-gray-600 group-hover/btn:text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleDownload(doc.id)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors group/btn"
                            title="Download document"
                          >
                            <Download className="w-5 h-5 text-gray-600 group-hover/btn:text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleRemove(doc.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group/btn"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-5 h-5 text-gray-600 group-hover/btn:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bookmark indicator */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-blue-600 border-l-[40px] border-l-transparent">
                      <Bookmark className="absolute -top-9 -right-0.5 w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
