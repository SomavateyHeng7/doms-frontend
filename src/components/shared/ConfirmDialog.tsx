"use client"

import { X } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  confirmLabel: string
  confirmColor?: "green" | "red"
  onConfirm: () => void
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmLabel,
  confirmColor = "green",
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null

  const colorClasses = {
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button 
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6 text-center">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={() => onOpenChange(false)}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors font-medium ${colorClasses[confirmColor]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
