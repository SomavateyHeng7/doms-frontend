import { Eye, Edit, Trash, Download, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ActionButtonsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onDownload?: () => void
  onUsers?: () => void
  showView?: boolean
  showEdit?: boolean
  showDelete?: boolean
  showDownload?: boolean
  showUsers?: boolean
  size?: 'sm' | 'md'
  variant?: 'default' | 'compact'
}

export default function ActionButtons({
  onView,
  onEdit,
  onDelete,
  onDownload,
  onUsers,
  showView = true,
  showEdit = true,
  showDelete = true,
  showDownload = false,
  showUsers = false,
  size = 'md',
  variant = 'default'
}: ActionButtonsProps) {
  const { t } = useTranslation()
  
  const buttonClasses = size === 'sm' 
    ? 'p-1 hover:bg-gray-100 rounded'
    : 'p-1 sm:p-1.5 hover:bg-gray-100 rounded'
    
  const iconClasses = size === 'sm'
    ? 'h-3 w-3 sm:h-4 sm:w-4'
    : 'h-4 w-4 sm:h-5 sm:w-5'

  const spacing = variant === 'compact' 
    ? 'space-x-1'
    : 'space-x-1 sm:space-x-2 lg:space-x-3'

  return (
    <div className={`flex items-center ${spacing}`}>
      {showView && onView && (
        <button 
          onClick={onView}
          className={`${buttonClasses} text-gray-500 hover:text-black`}
          title={t('common.view')}
        >
          <Eye className={iconClasses} />
        </button>
      )}
      
      {showEdit && onEdit && (
        <button 
          onClick={onEdit}
          className={`${buttonClasses} text-gray-500 hover:text-green-600`}
          title={t('common.edit')}
        >
          <Edit className={iconClasses} />
        </button>
      )}
      
      {showDownload && onDownload && (
        <button 
          onClick={onDownload}
          className={`${buttonClasses} text-gray-500 hover:text-blue-600 ${size === 'sm' ? 'hidden sm:inline-flex' : ''}`}
          title={t('common.download')}
        >
          <Download className={iconClasses} />
        </button>
      )}
      
      {showUsers && onUsers && (
        <button 
          onClick={onUsers}
          className={`${buttonClasses} text-gray-500 hover:text-purple-600 ${size === 'sm' ? 'hidden sm:inline-flex' : ''}`}
          title="View Users"
        >
          <Users className={iconClasses} />
        </button>
      )}
      
      {showDelete && onDelete && (
        <button 
          onClick={onDelete}
          className={`${buttonClasses} text-gray-500 hover:text-red-600`}
          title={t('common.delete')}
        >
          <Trash className={iconClasses} />
        </button>
      )}
    </div>
  )
}