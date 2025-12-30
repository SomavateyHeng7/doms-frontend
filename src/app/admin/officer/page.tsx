"use client"

import {
  Bell,
  Eye,
  Pencil,
  Download,
  Trash2,
  Info,
  X,
  CircleHelp,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import LanguageSwitcher from "@/components/LanguageSwitcher"
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

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login"
    }
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">
            {t("nav.officers")}
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
            <LanguageSwitcher />
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Profile + Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
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
                    {t("common.logout")}
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
