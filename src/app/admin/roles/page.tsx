"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Shield, Users, Eye, EyeOff, Settings, CheckCircle, XCircle, LogOut} from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "@/components/LanguageSwitcher"

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

import { useRef } from "react"

export default function RolesPage() {
  const { t } = useTranslation()
  const [rolesList] = useState<Role[]>(roles)
  const [showPermissions, setShowPermissions] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const togglePermissions = (roleId: string) => {
    setShowPermissions(showPermissions === roleId ? null : roleId)
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">{t('roles.title')}</h1>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t('roles.roleManagement')}</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{t('roles.description')}</p>
            </div>
            <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="text-sm sm:text-base">{t('roles.createRole')}</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('roles.totalRoles')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">{rolesList.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('roles.activeRoles')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {rolesList.filter(r => r.status === 'active').length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('roles.totalUsers')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {rolesList.reduce((sum, r) => sum + r.users, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{t('roles.totalPermissions')}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {Array.from(new Set(rolesList.flatMap(r => r.permissions))).length}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('roles.roleName')}
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('roles.roleDescription')}
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('roles.permissions')}
                    </th>
                    <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('pipelines.users')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.status')}
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rolesList.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {role.name === "Administrator" ? t('roles.administrator') :
                             role.name === "Manager" ? t('roles.manager') :
                             role.name === "Officer" ? t('roles.officer') :
                             role.name === "Viewer" ? t('roles.viewer') :
                             role.name === "Guest" ? t('roles.guest') :
                             role.name}
                          </div>
                          <div className="text-xs text-gray-500">ID: {role.id}</div>
                          {/* Mobile: Show description, permissions, and users below role name */}
                          <div className="sm:hidden space-y-2 mt-2">
                            <div className="text-xs text-gray-600 truncate max-w-[200px]">
                              {role.description === "Full system access with all permissions" ? t('roles.fullSystemAccess') :
                               role.description === "Department management with approval rights" ? t('roles.departmentManagement') :
                               role.description === "Document creation and basic management" ? t('roles.documentCreation') :
                               role.description === "Read-only access to documents" ? t('roles.readOnlyAccess') :
                               role.description === "Limited access for external users" ? t('roles.limitedAccess') :
                               role.description}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 2).map((permission) => (
                                <span key={permission} className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${permissionColors[permission as keyof typeof permissionColors]}`}>
                                  {permission === "Read" ? t('roles.read') :
                                   permission === "Write" ? t('roles.write') :
                                   permission === "Read Limited" ? t('roles.readLimited') :
                                   permission}
                                </span>
                              ))}
                              {role.permissions.length > 2 && (
                                <button
                                  onClick={() => togglePermissions(role.id)}
                                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                  {showPermissions === role.id ? <EyeOff className="h-2 w-2" /> : <Eye className="h-2 w-2" />}
                                  +{role.permissions.length - 2}
                                </button>
                              )}
                            </div>
                            {showPermissions === role.id && (
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.slice(2).map((permission) => (
                                  <span key={permission} className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${permissionColors[permission as keyof typeof permissionColors]}`}>
                                    {permission === "Read" ? t('roles.read') :
                                     permission === "Write" ? t('roles.write') :
                                     permission === "Read Limited" ? t('roles.readLimited') :
                                     permission}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="text-xs text-gray-600">{role.users} {t('pipelines.users')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {role.description === "Full system access with all permissions" ? t('roles.fullSystemAccess') :
                           role.description === "Department management with approval rights" ? t('roles.departmentManagement') :
                           role.description === "Document creation and basic management" ? t('roles.documentCreation') :
                           role.description === "Read-only access to documents" ? t('roles.readOnlyAccess') :
                           role.description === "Limited access for external users" ? t('roles.limitedAccess') :
                           role.description}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 2).map((permission) => (
                            <span key={permission} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${permissionColors[permission as keyof typeof permissionColors]}`}>
                              {permission === "Read" ? t('roles.read') :
                               permission === "Write" ? t('roles.write') :
                               permission === "Read Limited" ? t('roles.readLimited') :
                               permission}
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
                                {permission === "Read" ? t('roles.read') :
                                 permission === "Write" ? t('roles.write') :
                                 permission === "Read Limited" ? t('roles.readLimited') :
                                 permission}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {role.users} {t('pipelines.users')}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {role.status === 'active' ? (
                            <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                          ) : (
                            <XCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                          )}
                          <span className="hidden sm:inline">{t(`pipelines.${role.status}`)}</span>
                          <span className="sm:hidden">{role.status === 'active' ? t('pipelines.active') : t('pipelines.inactive')}</span>
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded" title={t('common.edit')}>
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          </button>
                          <button className="hidden sm:inline-flex p-1 hover:bg-gray-100 rounded" title="View Users">
                            <Users className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title={t('common.delete')}>
                            <Trash className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
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
