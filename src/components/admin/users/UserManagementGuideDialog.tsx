"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

interface UserManagementGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserManagementGuideDialog({
  open,
  onOpenChange,
}: UserManagementGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Management Guide</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">View Roles and Users</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">Create New Roles</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">Assign role to users</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">Edit Role Permission</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-700">Delete unused Roles</p>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              <span className="font-medium">Tip:</span> Use the search bar to
              quickly find specific user
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
