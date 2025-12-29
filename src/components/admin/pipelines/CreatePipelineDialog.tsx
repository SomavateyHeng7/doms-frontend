"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreatePipelineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pipelineName: string;
  onPipelineNameChange: (name: string) => void;
  onSubmit: () => void;
}

export default function CreatePipelineDialog({
  open,
  onOpenChange,
  pipelineName,
  onPipelineNameChange,
  onSubmit,
}: CreatePipelineDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pipelineName.trim()) {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Pipeline</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pipeline Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pipelineName}
              onChange={(e) => onPipelineNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
              placeholder="Enter pipeline name"
              autoFocus
            />
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
              type="submit"
              disabled={!pipelineName.trim()}
              className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Create Pipeline
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
