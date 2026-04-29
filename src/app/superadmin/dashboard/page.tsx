'use client'

import Link from "next/link"
import { Crown, Users, GitBranch, Shield, Settings, FileText, TrendingUp, Calendar, Wrench } from "lucide-react"
import PageHeader from "@/components/shared/PageHeader"
import { StatsCard } from "@/components/admin"
import { useSuperAdmin } from "@/contexts/SuperAdminContext"
import { useAuth } from "@/contexts/AuthContext"

export default function SuperadminDashboard() {
  const { config } = useSuperAdmin()
  const { user } = useAuth()

  const quickActions = [
    { href: "/superadmin-config", icon: Settings, label: "System Config", desc: "Maintenance, org, approval settings", iconColor: "text-purple-600", iconBg: "bg-purple-100" },
    { href: "/admin/users", icon: Users, label: "Manage Users", desc: "View, invite, suspend, ban users", iconColor: "text-blue-600", iconBg: "bg-blue-100" },
    { href: "/admin/roles", icon: Shield, label: "Manage Roles", desc: "Create and assign roles & permissions", iconColor: "text-indigo-600", iconBg: "bg-indigo-100" },
    { href: "/admin/pipelines", icon: GitBranch, label: "Pipelines", desc: "Configure approval workflows", iconColor: "text-green-600", iconBg: "bg-green-100" },
    { href: "/admin/documents", icon: FileText, label: "Documents", desc: "View all documents in the system", iconColor: "text-orange-600", iconBg: "bg-orange-100" },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title="Superadmin Dashboard" />
      <main className="flex-1 p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome back, {user?.name || 'Superadmin'}
              </h2>
              <p className="text-sm text-gray-500">Full system access · Technical overseer</p>
            </div>
          </div>

          {config.maintenance.enabled && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <Wrench className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800">System is in maintenance mode</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  All non-superadmin users are redirected to the maintenance page.
                </p>
              </div>
              <Link href="/superadmin-config" className="text-xs font-medium text-amber-700 underline underline-offset-2">
                Configure
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <StatsCard title="Total Documents" value="120" icon={FileText} iconColor="text-blue-600" iconBgColor="bg-blue-100" />
            <StatsCard title="Total Users" value="45" icon={Users} iconColor="text-green-600" iconBgColor="bg-green-100" />
            <StatsCard title="This Month" value="18" icon={Calendar} iconColor="text-purple-600" iconBgColor="bg-purple-100" />
            <StatsCard title="Growth" value="+12%" icon={TrendingUp} iconColor="text-orange-600" iconBgColor="bg-orange-100" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickActions.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
