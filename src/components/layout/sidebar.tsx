"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'react-i18next'
import { 
  LayoutDashboard, 
  FileText, 
  GitBranch, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield
} from "lucide-react"

export function Sidebar() {
  const { t } = useTranslation('common');
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const navigation = [
    {
      name: t('nav.dashboard'),
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: t('nav.documents'),
      href: "/admin/documents",
      icon: FileText,
    },
    {
      name: t('nav.pipelines'),
      href: "/admin/pipelines",
      icon: GitBranch,
    },
    {
      name: t('nav.roles'),
      href: "/admin/roles",
      icon: Shield,
    },
    {
      name: t('nav.users'),
      href: "/admin/users",
      icon: Users,
    },
    {
      name: t('nav.trash'),
      href: "/admin/trash",
      icon: Trash2,
    },
  ]

  const handleLogoError = () => {
    setLogoError(true)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Fix hydration error: always render the same className string on server and client
  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64'

  return (
    <div className={`flex min-h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300 ${sidebarWidth}`}>
      {/* Logo */}
      <div className="flex h-16 items-center px-4 relative">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              {!logoError ? (
                <Image
                  src="/image/logo.png"
                  alt="OfficeSync Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  onError={handleLogoError}
                  priority
                />
              ) : (
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              )}
              <span className="text-xl font-semibold text-gray-900">
                OfficeSync
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-full"
            >
              {!logoError ? (
                <Image
                  src="/image/logo.png"
                  alt="OfficeSync Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  onError={handleLogoError}
                  priority
                />
              ) : (
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle Button */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors group"
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
