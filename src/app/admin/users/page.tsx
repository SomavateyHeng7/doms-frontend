"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Users, Mail, Phone, Shield, CheckCircle, XCircle, Search, Filter, LogOut, HelpCircle, X, UserPlus } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useToast } from "@/components/ui/toast"
import { Dialog } from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  status: 'active' | 'suspended'
  roles: string
  lastActive: string
}

const users: User[] = [
  {
    id: "1010110101",
    name: "Mary Jane",
    status: "suspended",
    roles: "Users",
    lastActive: "15 min ago"
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago"
  },
 {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago"
  },
 {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago"
  },
 {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago"
  },
 {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago"
  },
 {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago"
  },
]

export default function UsersPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [usersList, setUsersList] = useState<User[]>(users)
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  const assignUsers = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 1" },
    { id: 3, name: "User 1" }
  ];

  const filteredUsers = usersList.filter(user => user.name !== "");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsersList(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-lg font-medium">{t('users.title')}</h1>
          <div className="flex items-center space-x-4 relative">
            <LanguageSwitcher />
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>

            {/* Profile + Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">JD</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('common.logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
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
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite Users</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Manage and create your user by inviting, assigning, and actions</p>
          </div>


          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={user.name !== ""}
                          readOnly
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4">
                        {user.name && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'suspended' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                          }`}>
                            {user.status === 'suspended' ? 'Suspended' : 'Active'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.roles && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                            {user.roles}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.lastActive}</td>
                      <td className="px-6 py-4">
                        {user.name && (
                          <div className="flex items-center space-x-2">
                            <button 
                              className="p-1.5 hover:bg-gray-100 rounded" 
                              title="Edit User"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </button>
                            <button 
                              onClick={() => setShowAssignDialog(true)}
                              className="text-green-600 hover:bg-green-50 p-1.5 rounded" 
                              title="Assign Role"
                            >
                              <UserPlus className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="p-1.5 hover:bg-red-50 rounded" 
                              title="Delete User"
                            >
                              <Trash className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows */}
                  {usersList.filter(u => u.name === "").map((user, index) => (
                    <tr key={`empty-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300" disabled />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* User Management Guide Dialog */}
      {showGuideDialog && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onMouseEnter={() => setShowGuideDialog(true)}
          onMouseLeave={() => setShowGuideDialog(false)}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Management Guide</h3>
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
                <p className="text-xs text-gray-600">Tip: Use the search bar to quickly find specific user</p>
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
                <input 
                  type="text"
                  value={searchUser} 
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Search User......"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {assignUsers.map((user) => (
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
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAssignDialog(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
