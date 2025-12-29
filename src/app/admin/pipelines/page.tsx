"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Play, Pause, Settings, Users, GitBranch, Clock, CheckCircle, LogOut } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useToast } from "@/components/ui/toast"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Pipeline {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'draft'
  steps: number
  users: number
  lastModified: string
  createdBy: string
}

const pipelines: Pipeline[] = [
  { 
    id: "PIPE-001", 
    name: "Document Approval Workflow", 
    description: "Standard approval process for all documents",
    status: "active", 
    steps: 5, 
    users: 12, 
    lastModified: "2 hours ago",
    createdBy: "Admin User"
  },
  { 
    id: "PIPE-002", 
    name: "Export Report Pipeline", 
    description: "Specialized workflow for export documentation",
    status: "active", 
    steps: 3, 
    users: 8, 
    lastModified: "1 day ago",
    createdBy: "Manager"
  },
  { 
    id: "PIPE-003", 
    name: "Contract Review Process", 
    description: "Multi-stage contract review and approval",
    status: "inactive", 
    steps: 7, 
    users: 15, 
    lastModified: "3 days ago",
    createdBy: "Legal Team"
  },
  { 
    id: "PIPE-004", 
    name: "Invoice Processing", 
    description: "Automated invoice approval workflow",
    status: "draft", 
    steps: 4, 
    users: 6, 
    lastModified: "1 week ago",
    createdBy: "Finance Team"
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  draft: "bg-blue-100 text-blue-800"
}

const statusIcons = {
  active: Play,
  inactive: Pause,
  draft: Settings
}

export default function PipelinesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { addToast } = useToast()
  const [pipelinesList, setPipelinesList] = useState<Pipeline[]>(pipelines)
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState<Pipeline | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    steps: "",
    users: "",
    status: "active" as 'active' | 'inactive' | 'draft'
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleCreatePipeline = () => {
    setEditingPipeline(null);
    setFormData({
      name: "",
      description: "",
      steps: "",
      users: "",
      status: "active"
    });
    setShowDialog(true);
  };

  const handleEditPipeline = (pipeline: Pipeline) => {
    setEditingPipeline(pipeline);
    setFormData({
      name: pipeline.name,
      description: pipeline.description,
      steps: pipeline.steps.toString(),
      users: pipeline.users.toString(),
      status: pipeline.status
    });
    setShowDialog(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPipeline) {
      setPipelinesList(prev => prev.map(p => 
        p.id === editingPipeline.id 
          ? { ...p, ...formData, steps: parseInt(formData.steps), users: parseInt(formData.users) }
          : p
      ));
      addToast({
        title: 'Success',
        description: 'Pipeline updated successfully',
        variant: 'success'
      });
    } else {
      const newPipeline: Pipeline = {
        id: `PIPE-${String(pipelinesList.length + 1).padStart(3, '0')}`,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        steps: parseInt(formData.steps),
        users: parseInt(formData.users),
        lastModified: 'Just now',
        createdBy: 'Current User'
      };
      setPipelinesList(prev => [...prev, newPipeline]);
      addToast({
        title: 'Success',
        description: 'Pipeline created successfully',
        variant: 'success'
      });
    }
    setShowDialog(false);
  };

  const handleDelete = (id: string) => {
    addToast({
      title: 'Delete Pipeline',
      description: 'Are you sure you want to delete this pipeline?',
      variant: 'warning',
      duration: 5000
    });
    // Ideally use a proper confirmation dialog here
    if (window.confirm('Are you sure you want to delete this pipeline?')) {
      setPipelinesList(prev => prev.filter(p => p.id !== id));
      addToast({
        title: 'Success',
        description: 'Pipeline deleted successfully',
        variant: 'success'
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium truncate">{t('pipelines.title')}</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
            <LanguageSwitcher />
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
                    {t('common.logout')}
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
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t('pipelines.pipelineManagement')}</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{t('pipelines.description')}</p>
            </div>
            <button 
              onClick={handleCreatePipeline}
              className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t('pipelines.createPipeline')}</span>
              <span className="sm:hidden">{t('common.create')}</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('pipelines.totalPipelines')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">{pipelinesList.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GitBranch className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('pipelines.activePipelines')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {pipelinesList.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Play className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('pipelines.totalSteps')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {pipelinesList.reduce((sum, p) => sum + p.steps, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('pipelines.totalUsers')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {pipelinesList.reduce((sum, p) => sum + p.users, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Pipelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pipelinesList.map((pipeline) => {
              const StatusIcon = statusIcons[pipeline.status]
              return (
                <div key={pipeline.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                        {pipeline.name === "Document Approval Workflow" ? t('pipelines.documentApprovalWorkflow') :
                         pipeline.name === "Export Report Pipeline" ? t('pipelines.exportReportPipeline') :
                         pipeline.name === "Contract Review Process" ? t('pipelines.contractReviewProcess') :
                         pipeline.name === "Invoice Processing" ? t('pipelines.invoiceProcessing') :
                         pipeline.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                        {pipeline.description === "Standard approval process for all documents" ? t('pipelines.standardApprovalProcess') :
                         pipeline.description === "Specialized workflow for export documentation" ? t('pipelines.specializedWorkflowExport') :
                         pipeline.description === "Multi-stage contract review and approval" ? t('pipelines.multiStageContractReview') :
                         pipeline.description === "Automated invoice approval workflow" ? t('pipelines.automatedInvoiceApproval') :
                         pipeline.description}
                      </p>
                      <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{pipeline.steps} {t('pipelines.steps')}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{pipeline.users} {t('pipelines.users')}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 shrink-0 ${statusColors[pipeline.status]}`}>
                      <StatusIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                      <span className="hidden sm:inline">{t(`pipelines.${pipeline.status}`)}</span>
                      <span className="sm:hidden">{t(`pipelines.${pipeline.status}`).charAt(0).toUpperCase()}</span>
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 sm:pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 space-y-1 sm:space-y-0">
                      <span className="truncate">{t('pipelines.createdBy')} {pipeline.createdBy}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {pipeline.lastModified.includes('hours ago') ? pipeline.lastModified.replace('hours ago', t('pipelines.hoursAgo')) :
                           pipeline.lastModified.includes('1 day ago') ? pipeline.lastModified.replace('1 day ago', `1 ${t('pipelines.dayAgo')}`) :
                           pipeline.lastModified.includes('days ago') ? pipeline.lastModified.replace('days ago', t('pipelines.daysAgo')) :
                           pipeline.lastModified.includes('week ago') ? pipeline.lastModified.replace('week ago', t('pipelines.weekAgo')) :
                           pipeline.lastModified}
                        </span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditPipeline(pipeline)}
                        className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>{t('common.edit')}</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(pipeline.id)}
                        className="flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Create/Edit Pipeline Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPipeline ? "Edit Pipeline" : "Create Pipeline"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pipeline Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                rows={3} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Steps</label>
              <input 
                name="steps" 
                type="number"
                value={formData.steps} 
                onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                required 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="e.g. 5" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Users</label>
              <input 
                name="users" 
                type="number"
                value={formData.users} 
                onChange={(e) => setFormData(prev => ({ ...prev, users: e.target.value }))}
                required 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="e.g. 12" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'draft' }))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
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
                {editingPipeline ? "Update Pipeline" : "Create Pipeline"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
