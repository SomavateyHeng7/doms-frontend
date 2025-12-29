"use client";

import {
  Bell,
  ChevronDown,
  Edit,
  Trash,
  LogOut,
  HelpCircle,
  UserPlus,
  Ban,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useToast } from "@/components/ui/toast";
import InviteUserDialog from "@/components/admin/users/InviteUserDialog";
import EditUserDialog from "@/components/admin/users/EditUserDialog";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";
import AssignRoleDialog from "@/components/admin/users/AssignRoleDialog";
import UserManagementGuideDialog from "@/components/admin/users/UserManagementGuideDialog";

interface User {
  id: string;
  name: string;
  status: "active" | "suspended";
  roles: string;
  lastActive: string;
  profilePicture?: string;
}

const users: User[] = [
  {
    id: "1010110101",
    name: "Mary Jane",
    status: "suspended",
    roles: "Users",
    lastActive: "15 min ago",
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago",
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago",
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago",
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago",
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago",
  },
  {
    id: "1010110101",
    name: "John Doe",
    status: "active",
    roles: "Users",
    lastActive: "21 days ago",
  },
];

export default function UsersPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addToast } = useToast();
  const [usersList, setUsersList] = useState<User[]>(users);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const availableRoles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
    { id: 3, name: "Moderator" },
  ];

  const filteredUsers = usersList.filter((user) => user.name !== "");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleInviteUser = (data: {
    name: string;
    email: string;
    role: string;
  }) => {
    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      status: "active",
      roles: data.role,
      lastActive: "Just now",
    };
    setUsersList((prev) => [...prev, newUser]);
    setShowInviteDialog(false);
    addToast({
      title: "Success",
      description: "User invited successfully",
      variant: "success",
    });
  };

  const handleEditUser = (data: { name: string; profilePicture?: string }) => {
    if (!selectedUser) return;

    setUsersList((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, name: data.name, profilePicture: data.profilePicture }
          : u
      )
    );
    setShowEditDialog(false);
    setSelectedUser(null);
    addToast({
      title: "Success",
      description: "User updated successfully",
      variant: "success",
    });
  };

  const handleToggleUserStatus = (user: User) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    setUsersList((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
    );
    addToast({
      title: "Success",
      description: `User ${
        newStatus === "suspended" ? "suspended" : "unsuspended"
      } successfully`,
      variant: "success",
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsersList((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowDeleteDialog(false);
    setSelectedUser(null);
    addToast({
      title: "Success",
      description: "User deleted successfully",
      variant: "success",
    });
  };

  const handleAssignRole = (roleIds: number[]) => {
    // TODO: Implement role assignment logic
    console.log("Assigned roles:", roleIds);
    addToast({
      title: "Success",
      description: `Assigned ${roleIds.length} role(s) to user`,
      variant: "success",
    });
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const openAssignDialog = (user: User) => {
    setSelectedUser(user);
    setShowAssignDialog(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-lg font-medium">
            {t("users.title")}
          </h1>
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
                    {t("common.logout")}
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
                <h2 className="text-2xl font-semibold text-gray-900">
                  User Management
                </h2>
                <button
                  onClick={() => setShowGuideDialog(true)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Help"
                >
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => setShowInviteDialog(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite Users</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Manage and create your user by inviting, assigning, and actions
            </p>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
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
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4">
                        {user.name && (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "suspended"
                                ? "bg-red-600 text-white"
                                : "bg-green-600 text-white"
                            }`}
                          >
                            {user.status === "suspended"
                              ? "Suspended"
                              : "Active"}
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
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4">
                        {user.name && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openEditDialog(user)}
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title="Edit User"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => openAssignDialog(user)}
                              className="text-green-600 hover:bg-green-50 p-1.5 rounded transition-colors"
                              title="Assign Role"
                            >
                              <UserPlus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleToggleUserStatus(user)}
                              className={`p-1.5 rounded transition-colors ${
                                user.status === "active"
                                  ? "text-orange-600 hover:bg-orange-50"
                                  : "text-green-600 hover:bg-green-50"
                              }`}
                              title={
                                user.status === "active"
                                  ? "Suspend User"
                                  : "Unsuspend User"
                              }
                            >
                              {user.status === "active" ? (
                                <Ban className="h-4 w-4" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => openDeleteDialog(user)}
                              className="p-1.5 hover:bg-red-50 rounded transition-colors"
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
                  {usersList
                    .filter((u) => u.name === "")
                    .map((user, index) => (
                      <tr key={`empty-${index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            disabled
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.id}
                        </td>
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

      {/* Dialogs */}
      <InviteUserDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onSubmit={handleInviteUser}
      />

      <EditUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={selectedUser}
        onSubmit={handleEditUser}
      />

      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        userName={selectedUser?.name}
        onConfirm={handleDeleteUser}
      />

      <AssignRoleDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        userName={selectedUser?.name}
        roles={availableRoles}
        selectedRoleIds={[]}
        onSave={handleAssignRole}
      />

      <UserManagementGuideDialog
        open={showGuideDialog}
        onOpenChange={setShowGuideDialog}
      />
    </div>
  );
}
