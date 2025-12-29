"use client";

import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RoleManagementGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RoleManagementGuideDialog({
  open,
  onOpenChange,
}: RoleManagementGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={() => onOpenChange(false)}
        onPointerMove={(e) => {
          const dialog = e.currentTarget;
          const rect = dialog.getBoundingClientRect();
          const isInside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
          if (!isInside) {
            onOpenChange(false);
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Role Management Guide</DialogTitle>
        </DialogHeader>
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
            <p className="text-xs text-gray-600">
              Tip: Use the search bar to quickly find specific roles
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
