import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  actionButton?: {
    label: string
    onClick: () => void
    icon?: LucideIcon
  }
  children?: React.ReactNode
}

export default function PageHeader({ title, description, actionButton, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mt-1">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        {children}
        
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            {actionButton.icon && <actionButton.icon className="h-4 w-4" />}
            <span className="text-sm sm:text-base">{actionButton.label}</span>
          </button>
        )}
      </div>
    </div>
  )
}