"use client"

import * as React from "react"
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "success" | "error" | "warning" | "info"
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
    <div className="fixed top-0 right-0 z-[100] w-full max-w-sm p-4 space-y-3 pointer-events-none md:top-4 md:right-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function Toast({ id, title, description, variant = "default", duration = 3000, onClose }: ToastProps & { onClose: () => void }) {
  const [progress, setProgress] = React.useState(100)
  const [isLeaving, setIsLeaving] = React.useState(false)

  React.useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      
      if (remaining === 0) {
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(onClose, 200)
  }

  const variantConfig = {
    default: {
      bg: "bg-white",
      border: "border-gray-200",
      icon: Info,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      progressBg: "bg-gray-300",
      progressBar: "bg-gray-600"
    },
    success: {
      bg: "bg-white",
      border: "border-green-200",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      progressBg: "bg-green-200",
      progressBar: "bg-green-600"
    },
    error: {
      bg: "bg-white",
      border: "border-red-200",
      icon: AlertCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      progressBg: "bg-red-200",
      progressBar: "bg-red-600"
    },
    warning: {
      bg: "bg-white",
      border: "border-amber-200",
      icon: AlertTriangle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      progressBg: "bg-amber-200",
      progressBar: "bg-amber-600"
    },
    info: {
      bg: "bg-white",
      border: "border-blue-200",
      icon: Info,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      progressBg: "bg-blue-200",
      progressBar: "bg-blue-600"
    }
  }

  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div
      className={`
        pointer-events-auto w-full rounded-xl border-2 shadow-2xl overflow-hidden
        ${config.bg} ${config.border}
        transition-all duration-200 ease-out
        ${isLeaving 
          ? 'opacity-0 translate-x-full scale-95' 
          : 'opacity-100 translate-x-0 scale-100 animate-in slide-in-from-right-full'
        }
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="relative">
        {/* Main Content */}
        <div className="flex items-start gap-3 p-4">
          {/* Icon */}
          <div className={`${config.iconBg} rounded-full p-2 flex-shrink-0`}>
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
          </div>

          {/* Text Content */}
          <div className="flex-1 pt-0.5">
            {title && (
              <div className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm text-gray-600 leading-snug">
                {description}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 rounded-lg p-1.5 hover:bg-gray-100 transition-colors group"
            aria-label="Close notification"
          >
            <X className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`h-1 ${config.progressBg}`}>
          <div
            className={`h-full ${config.progressBar} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
