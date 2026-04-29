"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, FileText, GitBranch, Trash2,
  ChevronLeft, ChevronRight, Users, Shield, Crown, Settings, Wrench,
} from "lucide-react"
import { useSuperAdmin } from "@/contexts/SuperAdminContext"

export default function SuperadminSidebar() {
  const { config, toggleMaintenance } = useSuperAdmin()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/admin/documents", icon: FileText },
    { name: "Pipelines", href: "/admin/pipelines", icon: GitBranch },
    { name: "Roles", href: "/admin/roles", icon: Shield },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Trash", href: "/admin/trash", icon: Trash2 },
  ]

  const systemNav = [
    { name: "System Config", href: "/superadmin-config", icon: Settings },
  ]

  const width = isCollapsed ? "w-16" : "w-64"

  return (
    <div className={`flex min-h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300 ${width}`}>
      <div className="relative flex h-16 items-center px-4">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            {!logoError ? (
              <Image src="/image/logo2.png" alt="OfficeSync" width={32} height={32}
                className="w-8 h-8 object-contain" onError={() => setLogoError(true)} priority />
            ) : (
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
            )}
            <span className="text-xl font-semibold text-gray-900">OfficeSync</span>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <Image src="/image/logo2.png" alt="OfficeSync" width={32} height={32}
              className="w-8 h-8 object-contain" onError={() => setLogoError(true)} priority />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(p => !p)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
        >
          {isCollapsed
            ? <ChevronRight className="h-4 w-4 text-gray-600" />
            : <ChevronLeft className="h-4 w-4 text-gray-600" />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col">
        <ul className="space-y-1 flex-1">
          {navigation.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 pt-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 px-3 mb-2">
              <Crown className="h-3.5 w-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">
                Superadmin
              </span>
            </div>
          )}
          <ul className="space-y-1">
            {systemNav.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                    pathname === item.href
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleMaintenance}
                title={isCollapsed
                  ? (config.maintenance.enabled ? "Disable Maintenance" : "Enable Maintenance")
                  : undefined}
                className={`w-full flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                  config.maintenance.enabled
                    ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Wrench className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap flex items-center gap-2">
                    Maintenance
                    {config.maintenance.enabled && (
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                    )}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
