"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Only render sidebar for admin routes
  const isAdminRoute = pathname.startsWith('/admin')

  if (!isAdminRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#dbdbdb] min-h-screen">
        {children}
      </div>
    </div>
  )
}
