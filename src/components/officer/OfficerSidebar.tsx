"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  Users,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function OfficerSidebar() {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  const navItems = [
    { name: "Dashboard", href: "/officer/dashboard", icon: LayoutDashboard },
    { name: "Assigned Requests", href: "/officer/assign-request", icon: FileText },
    { name: "Saved Documents", href: "/officer/saved-document", icon: Bookmark },
    { name: "Manage Broker", href: "/officer/broker-management", icon: Users },
    { name: "Trash Documents", href: "/officer/trash-document", icon: Trash2 },
  ]

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-56"
      } relative bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen transition-all duration-300`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 transition-colors z-10"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>

      {/* Logo */}
      <div className="p-6">
        <Link href="/officer/dashboard" className="flex items-center gap-3">
          {!logoError ? (
            <Image
              src="/image/logo2.png"
              alt="OfficeSync Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
          )}

          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900">
              OfficeSync
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "text-gray-900 bg-gray-100 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
