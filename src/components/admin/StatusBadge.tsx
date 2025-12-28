import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'draft' | 'active' | 'inactive'
  showIcon?: boolean
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, showIcon = true, size = 'md' }: StatusBadgeProps) {
  const { t } = useTranslation()
  
  const statusConfig = {
    pending: {
      label: t('dashboard.pending'),
      className: 'bg-orange-100 text-orange-800',
      icon: Clock
    },
    approved: {
      label: t('dashboard.approved'),
      className: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    rejected: {
      label: t('documents.rejected'),
      className: 'bg-red-100 text-red-800',
      icon: XCircle
    },
    draft: {
      label: t('documents.draft'),
      className: 'bg-blue-100 text-blue-800',
      icon: FileText
    },
    active: {
      label: t('dashboard.approved'), // Using approved as active equivalent
      className: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    inactive: {
      label: 'Inactive', // Keeping English for now
      className: 'bg-gray-100 text-gray-800',
      icon: XCircle
    }
  }
  
  const config = statusConfig[status]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs sm:text-sm'
  }

  const iconSizeClasses = {
    sm: 'h-2 w-2 sm:h-3 sm:w-3',
    md: 'h-3 w-3'
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.className} ${sizeClasses[size]}`}>
      {showIcon && (
        <Icon className={`mr-1 ${iconSizeClasses[size]}`} />
      )}
      {config.label}
    </span>
  )
}