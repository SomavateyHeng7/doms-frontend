"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RotateCcw, CheckCircle } from "lucide-react";

interface RestoreConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentName?: string;
  onConfirm: () => void;
}

export default function RestoreConfirmDialog({
  open,
  onOpenChange,
  documentName,
  onConfirm,
}: RestoreConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-green-600" />
            Restore Document
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium">
              Restore this document to its original location?
            </p>
            {documentName && (
              <p className="text-sm text-green-700 mt-1">
                Document: <span className="font-semibold">{documentName}</span>
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-700">This action will:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Move the document back to its original location</li>
              <li>Make it accessible again to all authorized users</li>
              <li>Preserve all document metadata and history</li>
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
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Restore Document
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
