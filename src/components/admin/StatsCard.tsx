import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100"
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg sm:text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`w-8 h-8 sm:w-12 sm:h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  )
}