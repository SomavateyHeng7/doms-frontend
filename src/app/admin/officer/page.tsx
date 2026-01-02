"use client"

import {
  Eye,
  Pencil,
  Download,
  Trash2,
  Info,
  X,
  CircleHelp,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import PageHeader from "@/components/shared/PageHeader"
import { useTranslation } from "react-i18next"
import { useToast } from "@/components/ui/toast"

const documents = [
  { id: "1010110101", name: "Export Report", type: "Report", status: "Pending", createdBy: "LIM PROM" },
  { id: "1010110102", name: "Export Report", type: "Report", status: "Approved", createdBy: "LIM PROM" },
  { id: "1010110103", name: "Export Report", type: "Report", status: "Rejected", createdBy: "LIM PROM" },
  { id: "1010110104", name: "Export Report", type: "Report", status: "Pending", createdBy: "LIM PROM" },
  { id: "1010110105", name: "Export Report", type: "Report", status: "Draft", createdBy: "LIM PROM" },
  { id: "1010110106", name: "Export Report", type: "Report", status: "Approved", createdBy: "LIM PROM" },
  { id: "1010110107", name: "Export Report", type: "Report", status: "Rejected", createdBy: "LIM PROM" },
  { id: "1010110108", name: "Export Report", type: "Report", status: "Draft", createdBy: "LIM PROM" },
]

const statusStyles = {
  Pending: "bg-yellow-400 text-white",
  Approved: "bg-green-500 text-white",
  Rejected: "bg-red-600 text-white",
  Draft: "bg-blue-400 text-white",
}

export default function OfficerDashboard() {
  const { t } = useTranslation()
  const { addToast } = useToast()
  const [showGuide, setShowGuide] = useState(false)
  const [checkedRows, setCheckedRows] = useState(Array(documents.length).fill(false))
  const [menuOpen, setMenuOpen] = useState(false)
  const selectAllRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleView = (docId: string, docName: string) => {
    addToast({
      title: 'View Document',
      description: `Opening ${docName}...`,
      variant: 'default'
    })
  }

  const handleEdit = (docId: string, docName: string) => {
    addToast({
      title: 'Edit Document',
      description: `Editing ${docName}...`,
      variant: 'default'
    })
  }

  const handleDownload = (docId: string, docName: string) => {
    addToast({
      title: 'Download Started',
      description: `Downloading ${docName}...`,
      variant: 'success'
    })
  }

  const handleDelete = (docId: string, docName: string) => {
    addToast({
      title: 'Document Deleted',
      description: `${docName} has been moved to trash`,
      variant: 'default'
    })
  }

  const handleCheckRow = (idx: number) => {
    setCheckedRows(prev => {
      const updated = [...prev]
      updated[idx] = !updated[idx]
      return updated
    })
  }

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(Array(documents.length).fill(e.target.checked))
  }

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        checkedRows.some(Boolean) && !checkedRows.every(Boolean)
    }
  }, [checkedRows])

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={t("nav.officers")} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-4 sm:mb-6 relative">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Documents Table</h2>
              <button
                className="rounded-full bg-black text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs focus:outline-none hover:bg-gray-800"
                onClick={() => setShowGuide(true)}
                aria-label="Show Document Management Guide"
              >
                <Info className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">
              Manage documents with view, edit, download, and delete.
            </div>

            {/* Tooltip/Modal */}
            {showGuide && (
              <div className="absolute z-20 left-0 mt-2 w-[280px] sm:w-[340px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 sm:p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-base sm:text-lg">Document Management Guide</span>
                  <button
                    onClick={() => setShowGuide(false)}
                    aria-label="Close Guide"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-black" />
                  </button>
                </div>
                <ul className="text-xs sm:text-sm text-gray-800 space-y-2 mb-4">
                  <li className="flex items-center gap-2"><span className="text-black text-xs">●</span> View Documents</li>
                  <li className="flex items-center gap-2"><span className="text-black text-xs">●</span> Upload new Document</li>
                  <li className="flex items-center gap-2"><span className="text-black text-xs">●</span> Edit Documents</li>
                  <li className="flex items-center gap-2"><span className="text-black text-xs">●</span> Download Documents</li>
                  <li className="flex items-center gap-2"><span className="text-black text-xs">●</span> Delete Documents</li>
                </ul>
                <div className="flex items-start gap-2 border-t pt-2 mt-2">
                  <CircleHelp className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5" />
                  <span className="text-xs text-gray-700">
                    Tip: Use the search bar to quickly find a document by ID or name.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-500">
                      <input
                        type="checkbox"
                        checked={checkedRows.every(Boolean)}
                        ref={selectAllRef}
                        onChange={handleCheckAll}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    </th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Name</th>
                    <th className="hidden sm:table-cell py-3 px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">ID</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Type</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Created By</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <input
                          type="checkbox"
                          checked={checkedRows[i]}
                          onChange={() => handleCheckRow(i)}
                          className="w-3 h-3 sm:w-4 sm:h-4"
                        />
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-700 text-sm">{doc.name}</div>
                          {/* Mobile: Show ID below name on small screens */}
                          <div className="sm:hidden space-y-1">
                            <div className="text-xs text-gray-500">ID: {doc.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-3 px-4 font-medium text-gray-700 text-sm">{doc.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{doc.type}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[doc.status as keyof typeof statusStyles]}`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{doc.createdBy}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                          <button onClick={() => handleView(doc.id, doc.name)} className="hover:text-black text-gray-500 p-1" title="View">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button onClick={() => handleEdit(doc.id, doc.name)} className="hover:text-green-600 text-gray-500 p-1" title="Edit Docs">
                            <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button onClick={() => handleDownload(doc.id, doc.name)} className="hidden sm:inline-flex hover:text-blue-600 text-gray-500 p-1" title="Download">
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button onClick={() => handleDelete(doc.id, doc.name)} className="hover:text-red-600 text-gray-500 p-1" title="Delete">
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </main>
    </div>
  )
}
