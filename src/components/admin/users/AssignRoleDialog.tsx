"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

interface Role {
  id: number;
  name: string;
}

interface AssignRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  roles?: Role[];
  selectedRoleIds?: number[];
  onSave?: (roleIds: number[]) => void;
}

export default function AssignRoleDialog({
  open,
  onOpenChange,
  userName,
  roles = [],
  selectedRoleIds = [],
  onSave,
}: AssignRoleDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedIds, setLocalSelectedIds] =
    useState<number[]>(selectedRoleIds);

  const filteredRoles = roles.filter((role) =>
    role.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRole = (roleId: number) => {
    setLocalSelectedIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSave = () => {
    onSave?.(localSelectedIds);
    onOpenChange(false);
  };

  const selectedCount = localSelectedIds.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Role to User</DialogTitle>
          {userName && (
            <p className="text-sm text-gray-500 mt-1">
              User:{" "}
              <span className="font-medium text-gray-700">{userName}</span>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          {/* Selected Count */}
          {selectedCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">{selectedCount}</span> role
                {selectedCount !== 1 ? "s" : ""} selected
              </p>
            </div>
          )}

          {/* Roles List */}
          <div className="border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
            {filteredRoles.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500">
                  {searchQuery
                    ? "No roles found matching your search"
                    : "No roles available"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredRoles.map((role) => {
                  const isSelected = localSelectedIds.includes(role.id);
                  return (
                    <label
                      key={role.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRole(role.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {role.name}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Assign
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
