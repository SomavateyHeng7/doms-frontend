"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface PermanentDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentName?: string;
  onConfirm: () => void;
}

export default function PermanentDeleteDialog({
  open,
  onOpenChange,
  documentName,
  onConfirm,
}: PermanentDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Permanent Delete
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              Permanently delete this document?
            </p>
            {documentName && (
              <p className="text-sm text-red-700 mt-1">
                Document: <span className="font-semibold">{documentName}</span>
              </p>
            )}
            <p className="text-xs text-red-600 mt-2 font-semibold">
              ⚠️ This action cannot be undone!
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-700">This action will:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Permanently remove the document from the system</li>
              <li>Delete all associated data and metadata</li>
              <li>Cannot be recovered after deletion</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
