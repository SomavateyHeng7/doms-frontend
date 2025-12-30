"use client"

import { PageTitleSection } from "@/components/shared"
import { Info } from "lucide-react"

interface PageTitleProps {
  title: string
  subtitle?: string
  showInfo?: boolean
}

export default function PageTitle({ title, subtitle, showInfo = true }: PageTitleProps) {
  return (
    <PageTitleSection 
      title={title} 
      description={subtitle}
      infoButton={showInfo ? { onClick: () => {} } : undefined}
    />
  )
}
