"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Shield, Users, Eye, EyeOff, Settings, CheckCircle, XCircle, LogOut, HelpCircle, X, Search, UserPlus} from "lucide-react"
import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useToast } from "@/components/ui/toast"
import { Dialog } from "@/components/ui/dialog"

interface Role {
  id: string
  name: string
}

const roles: Role[] = [
  {
    id: "ROLE-001",
    name: "Superadmin"
  },
  {
    id: "ROLE-002",
    name: "Admin"
  },
  {
    id: "ROLE-003",
    name: "Officer"
  },
  {
    id: "ROLE-004",
    name: "Broker"
  }
]

export default function RolesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [rolesList, setRolesList] = useState<Role[]>(roles)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 1" },
    { id: 3, name: "User 1" }
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleName.trim()) {
      const newRole: Role = {
        id: `ROLE-${String(rolesList.length + 1).padStart(3, '0')}`,
        name: roleName
      };
      setRolesList(prev => [...prev, newRole]);
      setRoleName("");
      setShowCreateDialog(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRolesList(prev => prev.filter(r => r.id !== id));
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
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Role Management</h2>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowGuideDialog(true)}
                    onMouseLeave={() => setShowGuideDialog(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    title="Help"
                  >
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowCreateDialog(true)}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-sm sm:text-base">Create Role</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Manage and create your role by creating and assign role to users.</p>
          </div>





          {/* Roles Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rolesList.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {role.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="p-1.5 hover:bg-gray-100 rounded" 
                            title="View"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(role.id)}
                            className="p-1.5 hover:bg-red-50 rounded" 
                            title="Delete"
                          >
                            <Trash className="h-4 w-4 text-red-600" />
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

      {/* Create Role Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create Role</h3>
              <button 
                onClick={() => setShowCreateDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <input 
                  type="text"
                  value={roleName} 
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Role Name *"
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateDialog(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role Management Guide Dialog */}
      {showGuideDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onMouseEnter={() => setShowGuideDialog(true)}
          onMouseLeave={() => setShowGuideDialog(false)}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Role Management Guide</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">View Roles and Users</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Create New Roles</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Assign role to users</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Edit Role Permission</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Delete unused Roles</p>
              </div>
            </div>
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <HelpCircle className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">Tip: Use the search bar to quickly find specific roles</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Role to User Dialog */}
      {showAssignDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Assign Role to User</h3>
              <button 
                onClick={() => setShowAssignDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text"
                  value={searchUser} 
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Search User......"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {users.map((user) => (
                    <label key={user.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
