"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { MaintenanceBanner } from "@/components/superadmin/MaintenanceBanner"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  const isAdminRoute = pathname.startsWith('/admin')

  if (!isAdminRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-white flex-col">
      <MaintenanceBanner />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-[#dbdbdb] min-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}
