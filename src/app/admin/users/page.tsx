"use client"

import { Bell, ChevronDown, Plus, Edit, Trash, Users, Mail, Phone, Shield, CheckCircle, XCircle, Search, Filter, LogOut } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useToast } from "@/components/ui/toast"
import { Dialog } from "@/components/ui/dialog"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  avatar: string
  phone?: string
}

const users: User[] = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Administrator",
    department: "IT",
    status: "active",
    lastLogin: "2 hours ago",
    avatar: "JD",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Manager",
    department: "Sales",
    status: "active",
    lastLogin: "1 day ago",
    avatar: "JS",
    phone: "+1 (555) 234-5678"
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Officer",
    department: "Marketing",
    status: "active",
    lastLogin: "3 days ago",
    avatar: "MJ",
    phone: "+1 (555) 345-6789"
  },
  {
    id: "USR-004",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Viewer",
    department: "HR",
    status: "inactive",
    lastLogin: "1 week ago",
    avatar: "SW",
    phone: "+1 (555) 456-7890"
  },
  {
    id: "USR-005",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Manager",
    department: "Finance",
    status: "pending",
    lastLogin: "Never",
    avatar: "DB",
    phone: "+1 (555) 567-8901"
  },
  {
    id: "USR-006",
    name: "Lisa Davis",
    email: "lisa.davis@company.com",
    role: "Officer",
    department: "Operations",
    status: "active",
    lastLogin: "5 hours ago",
    avatar: "LD",
    phone: "+1 (555) 678-9012"
  }
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800"
}

const statusIcons = {
  active: CheckCircle,
  inactive: XCircle,
  pending: Shield
}

export default function UsersPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { addToast } = useToast()
  const [usersList, setUsersList] = useState<User[]>(users)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "active" as 'active' | 'inactive' | 'pending'
  });

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "active"
    });
    setShowDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      department: user.department,
      status: user.status
    });
    setShowDialog(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsersList(prev => prev.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
      addToast({
        title: 'Success',
        description: 'User updated successfully',
        variant: 'success'
      });
    } else {
      const newUser: User = {
        id: `USR-${String(usersList.length + 1).padStart(3, '0')}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        status: formData.status,
        lastLogin: 'Never',
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setUsersList(prev => [...prev, newUser]);
      addToast({
        title: 'Success',
        description: 'User created successfully',
        variant: 'success'
      });
    }
    setShowDialog(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsersList(prev => prev.filter(u => u.id !== id));
      addToast({
        title: 'Success',
        description: 'User deleted successfully',
        variant: 'success'
      });
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('users.userManagement')}</h2>
              <p className="text-gray-600 mt-1">{t('users.description')}</p>
            </div>
            <button 
              onClick={handleCreateUser}
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>{t('users.addUser')}</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('users.totalUsers')}</p>
                  <p className="text-2xl font-semibold text-gray-900">{usersList.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('users.activeUsers')}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {usersList.filter(u => u.status === 'active').length}
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
                  <p className="text-sm font-medium text-gray-600">{t('users.pendingUsers')}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {usersList.filter(u => u.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('users.departments')}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {Array.from(new Set(usersList.map(u => u.department))).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('users.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const StatusIcon = statusIcons[user.status]
                    return (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-700">{user.avatar}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          {user.phone && (
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {user.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{user.role}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{user.department}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditUser(user)}
                              className="p-1 hover:bg-gray-100 rounded" 
                              title="Edit User"
                            >
                              <Edit className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded" title="Send Email">
                              <Mail className="h-4 w-4 text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="p-1 hover:bg-gray-100 rounded" 
                              title="Delete User"
                            >
                              <Trash className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Create/Edit User Dialog */}
      <Dialog 
        isOpen={showDialog} 
        onClose={() => setShowDialog(false)}
        title={editingUser ? "Edit User" : "Add User"}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Email</label>
            <input 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Phone</label>
            <input 
              name="phone" 
              value={formData.phone} 
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Select role</option>
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Officer">Officer</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Department</label>
            <input 
              name="department" 
              value={formData.department} 
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'pending' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
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
              {editingUser ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}
