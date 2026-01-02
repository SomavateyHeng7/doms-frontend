"use client";

import {
  Trash,
  Eye,
  HelpCircle,
  UserPlus,
} from "lucide-react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/components/ui/toast";
import {
  CreateRoleDialog,
  DeleteRoleDialog,
  AssignRoleDialog,
  RoleManagementGuideDialog,
} from "@/components/admin/roles";

interface Role {
  id: string;
  name: string;
}

const roles: Role[] = [
  {
    id: "ROLE-001",
    name: "Superadmin",
  },
  {
    id: "ROLE-002",
    name: "Admin",
  },
  {
    id: "ROLE-003",
    name: "Officer",
  },
  {
    id: "ROLE-004",
    name: "Broker",
  },
];

export default function RolesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addToast } = useToast();
  const [rolesList, setRolesList] = useState<Role[]>(roles);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 1" },
    { id: 3, name: "User 1" },
  ];

  const handleCreateRole = (roleName: string) => {
    const newRole: Role = {
      id: `ROLE-${String(rolesList.length + 1).padStart(3, "0")}`,
      name: roleName,
    };
    setRolesList((prev) => [...prev, newRole]);
    addToast({
      variant: "success",
      description: "Role created successfully",
    });
  };

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete) {
      setRolesList((prev) => prev.filter((r) => r.id !== roleToDelete.id));
      addToast({
        variant: "success",
        description: "Role deleted successfully",
      });
      setShowDeleteDialog(false);
      setRoleToDelete(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={t("roles.title")} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Role Management
                </h2>
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
            <p className="text-sm text-gray-600 mt-2">
              Manage and create your role by creating and assign role to users.
            </p>
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
                            onClick={() => handleDeleteClick(role)}
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

      {/* Dialogs */}
      <CreateRoleDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreate={handleCreateRole}
      />

      <DeleteRoleDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        role={roleToDelete}
        onDelete={handleDeleteConfirm}
      />

      <AssignRoleDialog
        open={showAssignDialog}
        onClose={() => setShowAssignDialog(false)}
        users={users}
      />

      <RoleManagementGuideDialog
        open={showGuideDialog}
        onOpenChange={setShowGuideDialog}
      />
    </div>
  );
}
