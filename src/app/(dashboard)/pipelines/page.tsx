"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Play, Pause, Settings, Users, GitBranch, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

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
  const [pipelinesList] = useState<Pipeline[]>(pipelines)

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-lg font-medium">Manage Pipelines</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">JD</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Pipeline Management</h2>
              <p className="text-gray-600 mt-1">Create and manage document approval workflows</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Create Pipeline</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pipelines</p>
                  <p className="text-2xl font-semibold text-gray-900">{pipelinesList.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GitBranch className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Pipelines</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {pipelinesList.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Steps</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {pipelinesList.reduce((sum, p) => sum + p.steps, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {pipelinesList.reduce((sum, p) => sum + p.users, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Pipelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipelinesList.map((pipeline) => {
              const StatusIcon = statusIcons[pipeline.status]
              return (
                <div key={pipeline.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{pipeline.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{pipeline.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>{pipeline.steps} steps</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{pipeline.users} users</span>
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[pipeline.status]}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>Created by {pipeline.createdBy}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{pipeline.lastModified}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
