"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteBrokerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brokerName?: string;
  onConfirm: () => void;
}

export default function DeleteBrokerDialog({
  open,
  onOpenChange,
  brokerName,
  onConfirm,
}: DeleteBrokerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Delete Broker
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              Are you sure you want to delete this broker?
            </p>
            {brokerName && (
              <p className="text-sm text-red-700 mt-1">
                Broker: <span className="font-semibold">{brokerName}</span>
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-700">This action will:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Permanently delete the broker account</li>
              <li>Remove all assigned document requests</li>
              <li>Cannot be undone</li>
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
              Delete Broker
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
