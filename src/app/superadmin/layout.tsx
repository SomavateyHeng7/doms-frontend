"use client"

import { useRoleGuard } from "@/hooks/useRoleGuard"
import { useSuperAdmin } from "@/contexts/SuperAdminContext"
import SuperadminSidebar from "@/components/superadmin/SuperadminSidebar"
import { MaintenanceBanner } from "@/components/superadmin/MaintenanceBanner"
import { ThemeProvider } from "@/components/mode/theme-provider"

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const { loading, hasRole } = useRoleGuard(['superadmin'])
  const { config } = useSuperAdmin()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasRole) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-white flex-col">
        <MaintenanceBanner />
        <div className="flex flex-1 min-h-0">
          <SuperadminSidebar />
          <div className="flex-1 flex flex-col bg-[#dbdbdb] min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
