"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    type: string;
    description: string;
    file: File | null;
  }) => void;
}

export default function UploadDocumentDialog({
  open,
  onOpenChange,
  onSubmit,
}: UploadDocumentDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      file: selectedFile,
    });
    
    // Reset form
    setSelectedFile(null);
    onOpenChange(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="relative pb-6">
          {/* <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 rounded-full p-1.5 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button> */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="h-7 w-7 text-gray-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">Upload files</DialogTitle>
              <p className="text-sm text-gray-500 mt-0.5">Select and upload the files of your choice</p>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Document Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
              placeholder="Enter document name"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              required
            >
              <option value="" className="text-gray-500">Select type</option>
              <option value="Report">Report</option>
              <option value="Invoice">Invoice</option>
              <option value="Contract">Contract</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400 resize-none"
              rows={3}
              placeholder="Add a description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Upload File <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Choose a file or drag & drop it here
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  PDF format, up to 50MB
                </p>
                <label className="cursor-pointer">
                  <span className="inline-block px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Browse File
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    required
                  />
                </label>
                {selectedFile && (
                  <div className="mt-3 text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                    Selected: <span className="font-medium">{selectedFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Upload Document
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
