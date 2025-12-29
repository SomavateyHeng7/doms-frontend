"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, User, X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  inPipeline?: boolean;
  approvalOrder?: number | null;
}

interface AssignUsersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pipelineName?: string;
  users?: User[];
  selectedUserIds?: string[];
  onSave?: (userIds: string[]) => void;
}

export default function AssignUsersDialog({
  open,
  onOpenChange,
  pipelineName,
  users = [],
  selectedUserIds = [],
  onSave,
}: AssignUsersDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedIds, setLocalSelectedIds] =
    useState<string[]>(selectedUserIds);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId: string) => {
    setLocalSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = () => {
    onSave?.(localSelectedIds);
    onOpenChange(false);
  };

  const selectedCount = localSelectedIds.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Users to Pipeline</DialogTitle>
          {pipelineName && (
            <p className="text-sm text-gray-500 mt-1">
              Pipeline:{" "}
              <span className="font-medium text-gray-700">{pipelineName}</span>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          {/* Selected Count */}
          {selectedCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">{selectedCount}</span> user
                {selectedCount !== 1 ? "s" : ""} selected for approval process
              </p>
            </div>
          )}

          {/* Users List */}
          <div className="border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="py-12 text-center">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  {searchQuery
                    ? "No users found matching your search"
                    : "No users available"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const isSelected = localSelectedIds.includes(user.id);
                  return (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleUser(user.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      {user.role && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {user.role}
                        </span>
                      )}
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
