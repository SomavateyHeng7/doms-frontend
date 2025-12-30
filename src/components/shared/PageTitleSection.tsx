"use client"

import { LucideIcon } from "lucide-react"

interface PageTitleSectionProps {
  title: string
  description?: string
  actionButton?: {
    label: string
    onClick: () => void
    icon?: LucideIcon
    variant?: "primary" | "secondary"
  }
  infoButton?: {
    onClick: () => void
  }
  children?: React.ReactNode
}

export default function PageTitleSection({ 
  title, 
  description, 
  actionButton,
  infoButton,
  children 
}: PageTitleSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
          {infoButton && (
            <button
              onClick={infoButton.onClick}
              className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <span className="text-xs">i</span>
            </button>
          )}
        </div>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mt-1">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        {children}
        
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors w-full sm:w-auto ${
              actionButton.variant === "secondary"
                ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {actionButton.icon && <actionButton.icon className="h-4 w-4" />}
            <span className="text-sm sm:text-base">{actionButton.label}</span>
          </button>
        )}
      </div>
    </div>
  )
}
