"use client"

import { Clock, Eye, Edit, Download, Trash2, Upload } from "lucide-react"
import Image from "next/image"


const documents = [
  { id: "1010110101", requester: "1010110101", status: "Approved", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Approved", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Pending", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Rejected", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Approved", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Approved", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Pending", approver: "LIM PROM", date: "25-08-2025" },
  { id: "1010110101", requester: "1010110101", status: "Rejected", approver: "LIM PROM", date: "25-08-2025" },
]

const statusBadge = (status: string) => {
  if (status === "Approved")
    return <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">Approved</span>;
  if (status === "Pending")
    return <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">Pending</span>;
  if (status === "Rejected")
    return <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">Rejected</span>;
  if (status === "Draft")
    return <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Draft</span>;
  return null;
}

export default function AdminDashboard() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#e5e5e5]">
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200 rounded-tl-2xl">
          <h1 className="text-xl font-semibold text-gray-700">Admin - Dashboard</h1>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Clock className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Image src="/image/user.png" alt="User" width={36} height={36} className="rounded-full object-cover" />
            </button>
          </div>
        </header>
        {/* Table */}
        <section className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-end mb-4">
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition">
                <Upload className="w-5 h-5" /> Upload Document
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-gray-800 font-bold">
                      <input type="checkbox" />
                    </th>
                    <th className="px-4 py-3 text-left text-gray-800 font-bold">ID</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-bold">Requester</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-bold">Status</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-bold">Approver</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-bold">Request Date</th>
                    <th className="px-4 py-3 text-left text-gray-800 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="px-4 py-3">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-3 font-mono text-gray-900 font-semibold">{doc.id}</td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">{doc.requester}</td>
                      <td className="px-4 py-3">{statusBadge(doc.status)}</td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">{doc.approver}</td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">{doc.date}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded"><Eye className="w-4 h-4 text-gray-700" /></button>
                        <button className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-green-600" /></button>
                        <button className="p-1 hover:bg-gray-100 rounded"><Download className="w-4 h-4 text-blue-600" /></button>
                        <button className="p-1 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-red-600" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
