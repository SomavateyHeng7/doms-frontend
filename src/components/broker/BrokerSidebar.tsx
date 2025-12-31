"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ClipboardList, History, FileText } from "lucide-react"

export default function BrokerSidebar() {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  const handleLogoError = () => {
    setLogoError(true)
  }

  const navItems = [
    {
      name: "My Requests",
      href: "/broker/my request",
      icon: ClipboardList,
    },
    {
      name: "Request History",
      href: "/broker/request hisotry",
      icon: History,
    },
  ]

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <Link href="/broker/my request" className="flex items-center gap-3">
          {!logoError ? (
            <Image
              src="/image/logo2.png"
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
          <span className="text-xl font-semibold text-gray-900">OfficeSync</span>
        </Link>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
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
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
