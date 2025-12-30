"use client"

import { CheckCircle, Circle, Ban } from "lucide-react"
import { useState } from "react"
import { OfficerSidebar, PageHeader, PageTitle } from "@/components/officer"

interface Broker {
  id: string
  name: string
  status: "Active" | "Suspended" | ""
  roles: string
  lastActive: string
  selected: boolean
}

const brokers: Broker[] = [
  { id: "1010110101", name: "Mary Jane", status: "Suspended", roles: "Users", lastActive: "15 min ago", selected: true },
  { id: "1010110101", name: "John Doe", status: "Active", roles: "Users", lastActive: "21 days ago", selected: true },
  { id: "1010110101", name: "", status: "", roles: "", lastActive: "", selected: true },
  { id: "1010110101", name: "", status: "", roles: "", lastActive: "", selected: false },
  { id: "1010110101", name: "", status: "", roles: "", lastActive: "", selected: false },
  { id: "1010110101", name: "", status: "", roles: "", lastActive: "", selected: false },
  { id: "1010110101", name: "", status: "", roles: "", lastActive: "", selected: false },
  { id: "1010110101", name: "", status: "", roles: "", lastActive: "", selected: false },
]

const statusColors = {
  Active: "bg-green-500 text-white",
  Suspended: "bg-red-500 text-white",
}

export default function BrokerManagement() {
  const [brokersList, setBrokersList] = useState<Broker[]>(brokers)

  const toggleSelection = (index: number) => {
    const newBrokers = [...brokersList]
    newBrokers[index].selected = !newBrokers[index].selected
    setBrokersList(newBrokers)
  }

  const toggleAll = () => {
    const allSelected = brokersList.every(b => b.selected)
    setBrokersList(brokersList.map(b => ({ ...b, selected: !allSelected })))
  }

  return (
    <div className="flex min-h-screen bg-white">
      <OfficerSidebar />

      <div className="flex-1 flex flex-col">
        <PageHeader title="Broker Management" />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <PageTitle 
              title="Broker Management" 
              subtitle="Manage and create your user by inviting, assigning, and actions."
            />

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <button onClick={toggleAll}>
                          {brokersList.every(b => b.selected) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roles
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {brokersList.map((broker, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <button onClick={() => toggleSelection(index)}>
                            {broker.selected ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {broker.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {broker.name}
                        </td>
                        <td className="px-6 py-4">
                          {broker.status && (
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusColors[broker.status]}`}>
                              {broker.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {broker.roles && (
                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                              {broker.roles}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {broker.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          {broker.name && (
                            <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                              <Ban className="w-5 h-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
