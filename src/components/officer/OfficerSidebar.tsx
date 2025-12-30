"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function OfficerSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/officer/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
        </svg>
      ),
    },
    {
      name: "Assigned Requests",
      href: "/officer/assign request",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-8h8v2H8v-2zm0 4h5v2H8v-2z" />
        </svg>
      ),
    },
    {
      name: "Saved Documents",
      href: "/officer/saved-documents",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-2-9h-4v4h-2v-4H6V9h4V5h2v4h4v2z" />
        </svg>
      ),
    },
    {
      name: "Manage Broker",
      href: "/officer/broker management",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
    {
      name: "Trash Documents",
      href: "/officer/trash-documents",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link href="/officer/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <path d="M8 12h8v2H8v-2zm0 4h5v2H8v-2z" fill="white"/>
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">OfficeSync</span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "text-gray-900 bg-gray-100 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
