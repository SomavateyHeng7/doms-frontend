"use client"

import { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, LogOut } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ClientOnly from '@/components/ClientOnly'

interface AdminHeaderProps {
  title: string
  children?: React.ReactNode
}

export default function AdminHeader({ title, children }: AdminHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = "/login"
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium truncate">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4 relative">
          {/* Additional content (like buttons) */}
          {children}
          
          {/* Language Switcher */}
          <ClientOnly fallback={
            <div className="px-2 sm:px-3 py-2">
              <span className="text-base">🇺🇸</span>
            </div>
          }>
            <LanguageSwitcher />
          </ClientOnly>
          
          {/* Notification Bell */}
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          
          <div className="w-px h-4 sm:h-6 bg-gray-300"></div>

          {/* Profile + Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-1 sm:space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-1.5 sm:p-2"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700">JD</span>
              </div>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}