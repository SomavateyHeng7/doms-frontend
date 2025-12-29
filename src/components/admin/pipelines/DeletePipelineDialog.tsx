"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface DeletePipelineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pipelineName?: string;
  onConfirm: () => void;
}

export default function DeletePipelineDialog({
  open,
  onOpenChange,
  pipelineName,
  onConfirm,
}: DeletePipelineDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Delete Pipeline
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              Are you sure you want to delete this pipeline?
            </p>
            {pipelineName && (
              <p className="text-sm text-red-700 mt-1">
                Pipeline: <span className="font-semibold">{pipelineName}</span>
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-700">This action will:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Permanently delete the pipeline</li>
              <li>Remove all associated stages</li>
              <li>Delete all configurations</li>
            </ul>
            <p className="text-red-600 font-medium mt-3">
              ⚠️ This action cannot be undone.
            </p>
          </div>

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
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Delete Pipeline
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
