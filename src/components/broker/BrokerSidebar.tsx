"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function BrokerSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "My Requests",
      href: "/broker/my request",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
        </svg>
      ),
    },
    {
      name: "Request History",
      href: "/broker/request hisotry",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
        </svg>
      ),
    },
  ]

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link href="/broker/my request" className="flex items-center gap-2">
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
