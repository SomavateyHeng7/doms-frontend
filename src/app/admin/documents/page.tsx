'use client'

import { Upload, CheckCircle, Circle, Info } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { AdminHeader, StatusBadge, ActionButtons, ResponsiveTable } from "@/components/admin"
import { Dialog } from "@/components/ui/dialog"
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
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    file: null as File | null,
  });

  const toggleSelection = (index: number) => {
    const newDocuments = [...documentsList]
    newDocuments[index].selected = !newDocuments[index].selected
    setDocumentsList(newDocuments)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    const files = (target as HTMLInputElement).files;
    setFormData(prev => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(true);
    // Add document logic here
    addToast({
      title: 'Success',
      description: 'Document uploaded successfully',
      variant: 'success'
    });
    setShowDialog(false);
    setFormData({
      name: "",
      type: "",
      description: "",
      file: null,
    });
  };



  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <AdminHeader title={t('documents.title')}>
      </AdminHeader>

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
              onClick={() => router.push('/admin/new-document')}
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
                    <ActionButtons
                      onView={() => console.log('View', doc.id)}
                      onEdit={() => console.log('Edit', doc.id)}
                      onDownload={() => console.log('Download', doc.id)}
                      onDelete={() => console.log('Delete', doc.id)}
                      showDownload={true}
                      size="sm"
                      variant="compact"
                    />
                  </ResponsiveTable.Cell>
                </ResponsiveTable.Row>
              ))}
            </ResponsiveTable.Body>
          </ResponsiveTable>
        </div>
      </main>

      {/* Upload Document Dialog */}
      <Dialog 
        isOpen={showDialog} 
        onClose={() => setShowDialog(false)}
        title="Upload Document"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter document name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select type</option>
              <option value="Report">Report</option>
              <option value="Invoice">Invoice</option>
              <option value="Contract">Contract</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Add a description (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              required
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button 
              type="button"
              onClick={() => setShowDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Upload Document
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
