"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";

interface EmptyTrashDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemCount: number;
  onConfirm: () => void;
}

export default function EmptyTrashDialog({
  open,
  onOpenChange,
  itemCount,
  onConfirm,
}: EmptyTrashDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            Empty Trash
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800 font-medium">
                  Permanently delete all items in trash?
                </p>
                <p className="text-sm text-red-700 mt-1">
                  This will delete <span className="font-semibold">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
                </p>
                <p className="text-xs text-red-600 mt-2 font-semibold">
                  ⚠️ This action cannot be undone!
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-700">This action will:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Permanently delete all documents in the trash</li>
              <li>Free up storage space</li>
              <li>Remove all associated data and metadata</li>
              <li>Cannot be recovered after deletion</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              <strong>Tip:</strong> Review documents before emptying trash. You can restore individual items if needed.
            </p>
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
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Empty Trash
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
