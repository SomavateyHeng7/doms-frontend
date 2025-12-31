"use client"

import { Trash2, RotateCcw, Eye, Download, X, AlertTriangle, FileText, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"
import { OfficerSidebar, PageHeader, PageTitle } from "@/components/officer"

interface TrashDocument {
  id: string
  name: string
  category: string
  deletedDate: string
  fileSize: string
  type: string
  daysRemaining: number
}

const trashDocuments: TrashDocument[] = [
  { 
    id: "DOC001", 
    name: "Old Export License Agreement", 
    category: "Export", 
    deletedDate: "28-12-2024",
    fileSize: "2.4 MB",
    type: "PDF",
    daysRemaining: 25
  },
  { 
    id: "DOC002", 
    name: "Draft Import Clearance", 
    category: "Import", 
    deletedDate: "26-12-2024",
    fileSize: "1.8 MB",
    type: "PDF",
    daysRemaining: 23
  },
  { 
    id: "DOC003", 
    name: "Outdated Trade Agreement", 
    category: "Trade", 
    deletedDate: "20-12-2024",
    fileSize: "3.1 MB",
    type: "PDF",
    daysRemaining: 17
  },
  { 
    id: "DOC004", 
    name: "Old Export Report", 
    category: "Export", 
    deletedDate: "15-12-2024",
    fileSize: "4.5 MB",
    type: "PDF",
    daysRemaining: 12
  },
  { 
    id: "DOC005", 
    name: "Duplicate Customs Form", 
    category: "Customs", 
    deletedDate: "10-12-2024",
    fileSize: "1.2 MB",
    type: "PDF",
    daysRemaining: 7
  },
]

export default function TrashDocuments() {
  const [documents, setDocuments] = useState<TrashDocument[]>(trashDocuments)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEmptyTrashDialog, setShowEmptyTrashDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<TrashDocument | null>(null)

  const handleRestore = (doc: TrashDocument) => {
    setSelectedDocument(doc)
    setShowRestoreDialog(true)
  }

  const confirmRestore = () => {
    if (selectedDocument) {
      setDocuments(documents.filter(doc => doc.id !== selectedDocument.id))
      setShowRestoreDialog(false)
      setSelectedDocument(null)
    }
  }

  const handlePermanentDelete = (doc: TrashDocument) => {
    setSelectedDocument(doc)
    setShowDeleteDialog(true)
  }

  const confirmPermanentDelete = () => {
    if (selectedDocument) {
      setDocuments(documents.filter(doc => doc.id !== selectedDocument.id))
      setShowDeleteDialog(false)
      setSelectedDocument(null)
    }
  }

  const handleEmptyTrash = () => {
    setShowEmptyTrashDialog(true)
  }

  const confirmEmptyTrash = () => {
    setDocuments([])
    setShowEmptyTrashDialog(false)
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
        <PageHeader title="Trash Documents" />

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <PageTitle 
                title="Trash Documents" 
                subtitle="Deleted documents are kept for 30 days before permanent deletion."
              />
              
              {documents.length > 0 && (
                <button
                  onClick={handleEmptyTrash}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Empty Trash
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-600">
                      Total Items: <span className="font-semibold text-gray-900">{documents.length}</span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Size: <span className="font-semibold text-gray-900">
                      {documents.reduce((sum, doc) => {
                        const size = parseFloat(doc.fileSize.split(' ')[0])
                        return sum + size
                      }, 0).toFixed(1)} MB
                    </span>
                  </div>
                </div>
                {documents.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Auto-delete in {Math.min(...documents.map(d => d.daysRemaining))} days</span>
                  </div>
                )}
              </div>
            </div>

            {/* Document Cards */}
            {documents.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Trash is empty</h3>
                <p className="text-sm text-gray-500">Deleted documents will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        {/* Left Section - Document Icon and Info */}
                        <div className="flex gap-4 flex-1">
                          <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                            <Trash2 className="w-7 h-7 text-red-600" />
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
                            <div className="mt-2 flex items-center gap-4">
                              <div>
                                <span className="text-xs text-gray-400">Deleted on: </span>
                                <span className="text-xs text-gray-500">{doc.deletedDate}</span>
                              </div>
                              <div className={`flex items-center gap-1 ${doc.daysRemaining <= 7 ? 'text-red-600' : 'text-amber-600'}`}>
                                <AlertTriangle className="w-3 h-3" />
                                <span className="text-xs font-medium">
                                  {doc.daysRemaining} {doc.daysRemaining === 1 ? 'day' : 'days'} remaining
                                </span>
                              </div>
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
                            onClick={() => handleRestore(doc)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors group/btn"
                            title="Restore document"
                          >
                            <RotateCcw className="w-5 h-5 text-gray-600 group-hover/btn:text-green-600" />
                          </button>
                          <button 
                            onClick={() => handlePermanentDelete(doc)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group/btn"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-5 h-5 text-gray-600 group-hover/btn:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Restore Confirmation Dialog */}
      {showRestoreDialog && selectedDocument && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Restore Document</h3>
              </div>
              <button 
                onClick={() => setShowRestoreDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-2">
              Are you sure you want to restore this document?
            </p>
            <p className="text-sm font-medium text-gray-900 mb-6">
              "{selectedDocument.name}"
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRestoreDialog(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestore}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Delete Confirmation Dialog */}
      {showDeleteDialog && selectedDocument && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Permanently</h3>
              </div>
              <button 
                onClick={() => setShowDeleteDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-2">
              Are you sure you want to permanently delete this document? This action cannot be undone.
            </p>
            <p className="text-sm font-medium text-gray-900 mb-6">
              "{selectedDocument.name}"
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPermanentDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty Trash Confirmation Dialog */}
      {showEmptyTrashDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Empty Trash</h3>
              </div>
              <button 
                onClick={() => setShowEmptyTrashDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-2">
              Are you sure you want to permanently delete all {documents.length} {documents.length === 1 ? 'document' : 'documents'} in the trash?
            </p>
            <p className="text-sm text-red-600 font-medium mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEmptyTrashDialog(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEmptyTrash}
                className="px-4 py-2 bg-black-600 text-white rounded-lg hover:bg-black-700 transition-colors"
              >
                Empty Trash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
