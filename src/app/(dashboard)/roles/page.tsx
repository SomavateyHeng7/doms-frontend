"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Shield, Users, Eye, EyeOff, Settings, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  users: number
  status: 'active' | 'inactive'
  createdAt: string
  createdBy: string
}

const roles: Role[] = [
  {
    id: "ROLE-001",
    name: "Administrator",
    description: "Full system access with all permissions",
    permissions: ["Read", "Write", "Delete", "Approve", "Manage Users", "Manage Roles"],
    users: 3,
    status: "active",
    createdAt: "2024-01-15",
    createdBy: "System"
  },
  {
    id: "ROLE-002",
    name: "Manager",
    description: "Department management with approval rights",
    permissions: ["Read", "Write", "Approve", "Manage Documents"],
    users: 8,
    status: "active",
    createdAt: "2024-02-01",
    createdBy: "Admin"
  },
  {
    id: "ROLE-003",
    name: "Officer",
    description: "Document creation and basic management",
    permissions: ["Read", "Write", "Create Documents"],
    users: 15,
    status: "active",
    createdAt: "2024-02-10",
    createdBy: "Admin"
  },
  {
    id: "ROLE-004",
    name: "Viewer",
    description: "Read-only access to documents",
    permissions: ["Read"],
    users: 25,
    status: "active",
    createdAt: "2024-02-15",
    createdBy: "Manager"
  },
  {
    id: "ROLE-005",
    name: "Guest",
    description: "Limited access for external users",
    permissions: ["Read Limited"],
    users: 5,
    status: "inactive",
    createdAt: "2024-03-01",
    createdBy: "Admin"
  }
]

const permissionColors = {
  "Read": "bg-blue-100 text-blue-800",
  "Write": "bg-green-100 text-green-800",
  "Delete": "bg-red-100 text-red-800",
  "Approve": "bg-purple-100 text-purple-800",
  "Manage Users": "bg-orange-100 text-orange-800",
  "Manage Roles": "bg-indigo-100 text-indigo-800",
  "Create Documents": "bg-teal-100 text-teal-800",
  "Read Limited": "bg-gray-100 text-gray-800"
}

export default function RolesPage() {
  const [rolesList, setRolesList] = useState<Role[]>(roles)
  const [showPermissions, setShowPermissions] = useState<string | null>(null)

  const togglePermissions = (roleId: string) => {
    setShowPermissions(showPermissions === roleId ? null : roleId)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-lg font-medium">Manage Roles</h1>
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
              <h2 className="text-2xl font-semibold text-gray-900">Role Management</h2>
              <p className="text-gray-600 mt-1">Create and manage user roles and permissions</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Create Role</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Roles</p>
                  <p className="text-2xl font-semibold text-gray-900">{rolesList.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Roles</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {rolesList.filter(r => r.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {rolesList.reduce((sum, r) => sum + r.users, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Permissions</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {Array.from(new Set(rolesList.flatMap(r => r.permissions))).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Roles Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Users
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rolesList.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{role.name}</div>
                          <div className="text-sm text-gray-500">ID: {role.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{role.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 2).map((permission) => (
                            <span key={permission} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${permissionColors[permission as keyof typeof permissionColors]}`}>
                              {permission}
                            </span>
                          ))}
                          {role.permissions.length > 2 && (
                            <button
                              onClick={() => togglePermissions(role.id)}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              {showPermissions === role.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              +{role.permissions.length - 2}
                            </button>
                          )}
                        </div>
                        {showPermissions === role.id && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {role.permissions.slice(2).map((permission) => (
                              <span key={permission} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${permissionColors[permission as keyof typeof permissionColors]}`}>
                                {permission}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {role.users} users
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {role.status === 'active' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded" title="Edit Role">
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="View Users">
                            <Users className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Delete Role">
                            <Trash className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
