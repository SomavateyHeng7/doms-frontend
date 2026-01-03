'use client'

import { Upload, CheckCircle, Circle, Info, MoreVertical, FileUp, FileEdit, FilePlus, Trash2, Eye } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { StatusBadge, ActionButtons, ResponsiveTable } from "@/components/admin"
import PageHeader from "@/components/shared/PageHeader"
import { UploadDocumentDialog } from "@/components/admin/documents"
import { useToast } from "@/components/ui/toast"

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

export default function DocumentsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { addToast } = useToast()
  const [documentsList, setDocumentsList] = useState<Document[]>(documents)
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSelection = (index: number) => {
    const newDocuments = [...documentsList]
    newDocuments[index].selected = !newDocuments[index].selected
    setDocumentsList(newDocuments)
  }

  const handleUploadDocument = (data: { name: string; type: string; description: string; file: File | null }) => {
    // Add document logic here
    addToast({
      title: 'Success',
      description: 'Document uploaded successfully',
      variant: 'success'
    });
  };



  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={t('documents.title')} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">{t('documents.documentsTable')}</h2>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded-full flex items-center justify-center">
                <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
              </div>
            </div>
            <button 
              onClick={() => setShowUploadDialog(true)}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t('documents.uploadDocument')}</span>
              <span className="sm:hidden">{t('documents.upload')}</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{t('documents.description')}</p>

          {/* Documents Table */}
          <ResponsiveTable>
            <ResponsiveTable.Header>
              <ResponsiveTable.HeaderCell className="w-12"> </ResponsiveTable.HeaderCell>
              <ResponsiveTable.HeaderCell>{t('documents.id')}</ResponsiveTable.HeaderCell>
              <ResponsiveTable.HeaderCell>{t('documents.name')}</ResponsiveTable.HeaderCell>
              <ResponsiveTable.HeaderCell hideOnMobile>{t('documents.type')}</ResponsiveTable.HeaderCell>
              <ResponsiveTable.HeaderCell>{t('common.status')}</ResponsiveTable.HeaderCell>
              <ResponsiveTable.HeaderCell hideOnTablet>{t('documents.createdBy')}</ResponsiveTable.HeaderCell>
              <ResponsiveTable.HeaderCell>{t('common.actions')}</ResponsiveTable.HeaderCell>
            </ResponsiveTable.Header>
            <ResponsiveTable.Body>
              {documentsList.map((doc, index) => (
                <ResponsiveTable.Row key={index}>
                  <ResponsiveTable.Cell>
                    <button onClick={() => toggleSelection(index)}>
                      {doc.selected ? (
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" />
                      )}
                    </button>
                  </ResponsiveTable.Cell>
                  <ResponsiveTable.Cell className="font-mono">{doc.id}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>
                    <div className="truncate max-w-[120px] sm:max-w-none">{t('documents.exportReport')}</div>
                    <div className="sm:hidden text-xs text-gray-500 mt-1">{t('documents.report')}</div>
                  </ResponsiveTable.Cell>
                  <ResponsiveTable.Cell hideOnMobile>{t('documents.report')}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>
                    <StatusBadge status={doc.status} />
                  </ResponsiveTable.Cell>
                  <ResponsiveTable.Cell hideOnTablet>{doc.createdBy}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>
                    <div className="flex items-center space-x-1">
                      <ActionButtons
                        onView={() => console.log('View', doc.id)}
                        onEdit={() => console.log('Edit', doc.id)}
                        onDownload={() => console.log('Download', doc.id)}
                        showDownload={true}
                        showDelete={false}
                        size="sm"
                        variant="compact"
                      />
                      {/* <div className="relative" ref={openDropdownId === doc.id ? dropdownRef : null}>
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === doc.id ? null : doc.id)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-black"
                          title="More actions"
                        > */}
                          {/* <MoreVertical className="h-4 w-4" />
                        </button>
                        {openDropdownId === doc.id && (
                          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  console.log('Resubmit Change Request', doc.id);
                                  setOpenDropdownId(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <FileUp className="h-4 w-4 mr-3 text-orange-500" />
                                Resubmit Change Request
                              </button>
                              <button
                                onClick={() => {
                                  console.log('Add Subpage', doc.id);
                                  setOpenDropdownId(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <FilePlus className="h-4 w-4 mr-3 text-gray-500" />
                                Add Subpage
                              </button>
                              <div className="border-t border-gray-100 my-1"></div>
                              <div className="px-4 py-2">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center text-sm text-gray-700">
                                    <Eye className="h-4 w-4 mr-2 text-gray-500" />
                                    Publish Page
                                  </div>
                                  <button
                                    className="relative inline-flex h-5 w-9 items-center rounded-full bg-blue-600"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log('Toggle Publish Page', doc.id);
                                    }}
                                  >
                                    <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition translate-x-5" />
                                  </button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-700">
                                    <FileEdit className="h-4 w-4 mr-2 text-gray-500" />
                                    Put in Navbar
                                  </div>
                                  <button
                                    className="relative inline-flex h-5 w-9 items-center rounded-full bg-teal-500"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log('Toggle Put in Navbar', doc.id);
                                    }}
                                  >
                                    <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition translate-x-5" />
                                  </button>
                                </div>
                              </div>
                              <div className="border-t border-gray-100 my-1"></div>
                              <button
                                onClick={() => {
                                  console.log('Delete', doc.id);
                                  setOpenDropdownId(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div> */}
                    </div>
                  </ResponsiveTable.Cell>
                </ResponsiveTable.Row>
              ))}
            </ResponsiveTable.Body>
          </ResponsiveTable>
        </div>
      </main>

      {/* Upload Document Dialog */}
      <UploadDocumentDialog 
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        onSubmit={handleUploadDocument}
      />
    </div>
  )
}
