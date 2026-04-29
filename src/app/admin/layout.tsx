"use client"

import { useRoleGuard } from "@/hooks/useRoleGuard"
import { useSuperAdmin } from "@/contexts/SuperAdminContext"
import ConditionalLayout from "@/components/layout/conditionalLayout"
import { ThemeProvider } from "@/components/mode/theme-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, hasRole } = useRoleGuard(['admin', 'superadmin'])
  const { isSuperAdmin, config } = useSuperAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!loading && hasRole && !isSuperAdmin && config.maintenance.enabled) {
      router.replace('/maintenance')
    }
  }, [loading, hasRole, isSuperAdmin, config.maintenance.enabled, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasRole) return null
  if (!isSuperAdmin && config.maintenance.enabled) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </ThemeProvider>
  )
}
