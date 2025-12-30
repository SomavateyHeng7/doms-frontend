import { PageTitleSection } from '@/components/shared'
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
  return <PageTitleSection title={title} description={description} actionButton={actionButton}>{children}</PageTitleSection>
}