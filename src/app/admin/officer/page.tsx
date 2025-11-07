"use client"

import { Sidebar } from "@/components/layout/sidebar"
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
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

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
  const [showGuide, setShowGuide] = useState(false)
  const [checkedRows, setCheckedRows] = useState(Array(documents.length).fill(false))
  const [menuOpen, setMenuOpen] = useState(false)
  const selectAllRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">Officer-Dashboard</h1>
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
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, shown on tablet and up */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <section className="flex-1 flex flex-col bg-white md:rounded-tl-3xl shadow-sm overflow-auto">
          {/* Topbar */}
          <div className="flex items-center justify-between sm:justify-end h-14 sm:h-16 px-4 sm:px-8 border-b border-gray-100 gap-3 sm:gap-6">
            <button className="px-3 sm:px-5 py-2 rounded-full bg-black text-white font-medium flex items-center gap-2 text-sm sm:text-base hover:bg-gray-900 transition">
              <span className="text-base sm:text-lg">⇪</span> 
              <span className="hidden sm:inline">Upload Document</span>
              <span className="sm:hidden">Upload</span>
            </button>
            <div className="flex items-center gap-3 sm:gap-6">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src="/image/user.png"
                  alt="User"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 sm:gap-8 px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
            <div className="mb-2 sm:mb-4 relative">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-semibold">Documents Table</h2>
                <button
                  className="rounded-full bg-black text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs focus:outline-none hover:bg-gray-800"
                  onClick={() => setShowGuide(true)}
                  aria-label="Show Document Management Guide"
                >
                  <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
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
            <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 bg-white">
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
                    <th className="hidden md:table-cell py-3 px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Type</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Status</th>
                    <th className="hidden lg:table-cell py-3 px-4 text-left font-medium text-gray-500 text-xs sm:text-sm">Created By</th>
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
                          {/* Mobile: Show ID, type, and created by below name */}
                          <div className="sm:hidden space-y-1">
                            <div className="text-xs text-gray-500">ID: {doc.id}</div>
                            <div className="md:hidden text-xs text-gray-500">Type: {doc.type}</div>
                            <div className="lg:hidden text-xs text-gray-500">By: {doc.createdBy}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-3 px-4 font-medium text-gray-700 text-sm">{doc.id}</td>
                      <td className="hidden md:table-cell py-3 px-4 text-sm">{doc.type}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[doc.status as keyof typeof statusStyles]}`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell py-3 px-4 text-sm">{doc.createdBy}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                          <button className="hover:text-black text-gray-500 p-1" title="View">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button className="hover:text-green-600 text-gray-500 p-1" title="Edit Docs">
                            <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button className="hidden sm:inline-flex hover:text-blue-600 text-gray-500 p-1" title="Download">
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button className="hover:text-red-600 text-gray-500 p-1" title="Delete">
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
        </section>
      </main>
    </div>
  )
}
