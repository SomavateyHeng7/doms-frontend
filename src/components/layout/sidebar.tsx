"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  ChevronDown,
  Crown,
  Settings,
  Wrench,
} from "lucide-react"
import { useSuperAdmin } from "@/contexts/SuperAdminContext"

export function Sidebar() {
  const { t } = useTranslation("common")
  const { isSuperAdmin, config, toggleMaintenance } = useSuperAdmin()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false)

  const navigation = [
    {
      name: t("nav.dashboard"),
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: t("nav.documents"),
      href: "/admin/documents",
      icon: FileText,
    },
    {
      name: t("nav.pipelines"),
      href: "/admin/pipelines",
      icon: GitBranch,
    },
    {
      name: t("nav.roles"),
      href: "/admin/roles",
      icon: Shield,
    },
    {
      name: t("nav.users"),
      href: "/admin/users",
      icon: Users,
      hasDropdown: true,
      subItems: [
        { name: t("nav.brokers"), href: "/admin/broker" },
        { name: t("nav.officers"), href: "/admin/officer" },
      ],
    },
    {
      name: t("nav.trash"),
      href: "/admin/trash",
      icon: Trash2,
    },
  ]

  const superAdminNav = [
    {
      name: "System Config",
      href: "/superadmin-config",
      icon: Settings,
    },
  ]

  const sidebarWidth = isCollapsed ? "w-16" : "w-64"

  return (
    <div
      className={`flex min-h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300 ${sidebarWidth}`}
    >
      {/* Logo */}
      <div className="relative flex h-16 items-center px-4">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
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
              <span className="text-xl font-semibold text-gray-900">
                OfficeSync
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex w-full justify-center"
            >
              <Image
                src="/image/logo2.png"
                alt="OfficeSync Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                onError={() => setLogoError(true)}
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed((p) => !p)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col">
        <ul className="space-y-2 flex-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.hasDropdown ? (
                <div>
                  {/* Main row */}
                  <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100">
                    {/* Navigate */}
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
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

                    {/* Dropdown toggle */}
                    {!isCollapsed && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setIsUsersDropdownOpen((prev) => !prev)
                        }}
                        className="p-1 rounded hover:bg-gray-200"
                      >
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 transition-transform ${
                            isUsersDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Sub items */}
                  <AnimatePresence>
                    {isUsersDropdownOpen && !isCollapsed && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-8 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.subItems?.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
              )}
            </li>
          ))}
        </ul>

        {/* Superadmin section */}
        {isSuperAdmin && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {/* Label */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 px-3 mb-2"
                >
                  <Crown className="h-3.5 w-3.5 text-purple-500" />
                  <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">
                    Superadmin
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="space-y-1">
              {/* Config page */}
              {superAdminNav.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-purple-700 hover:bg-purple-50 hover:text-purple-900"
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

              {/* Quick maintenance toggle */}
              <li>
                <button
                  onClick={toggleMaintenance}
                  title={isCollapsed ? (config.maintenance.enabled ? "Disable Maintenance" : "Enable Maintenance") : undefined}
                  className={`w-full flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors
                    ${config.maintenance.enabled
                      ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <Wrench className="h-5 w-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium whitespace-nowrap overflow-hidden flex items-center gap-2"
                      >
                        Maintenance
                        {config.maintenance.enabled && (
                          <span className="inline-block h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}
