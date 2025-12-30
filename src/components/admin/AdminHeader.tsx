"use client"

import { AppHeader } from "@/components/shared"

interface AdminHeaderProps {
  title: string
  children?: React.ReactNode
}

export default function AdminHeader({ title, children }: AdminHeaderProps) {
  return <AppHeader title={title} showLanguageSwitcher={true}>{children}</AppHeader>
}