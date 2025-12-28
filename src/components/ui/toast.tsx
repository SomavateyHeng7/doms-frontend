"use client"

import * as React from "react"
import { X } from "lucide-react"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "success" | "error" | "warning"
  duration?: number
}

interface ToastContextType {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    const duration = toast.duration || 3000
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

function ToastViewport({ toasts, removeToast }: { toasts: ToastProps[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-0 right-0 z-50 w-full max-w-md p-4 space-y-4 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function Toast({ title, description, variant = "default", onClose }: ToastProps & { onClose: () => void }) {
  const variantStyles = {
    default: "bg-white border-gray-200",
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200"
  }

  const iconColors = {
    default: "text-gray-600",
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600"
  }

  return (
    <div
      className={`pointer-events-auto w-full rounded-lg border shadow-lg p-4 ${variantStyles[variant]} animate-in slide-in-from-bottom-5`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && <div className={`font-semibold ${iconColors[variant]}`}>{title}</div>}
          {description && <div className="text-sm text-gray-600 mt-1">{description}</div>}
        </div>
        <button
          onClick={onClose}
          className={`shrink-0 rounded-md p-1 hover:bg-gray-100 transition-colors ${iconColors[variant]}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
