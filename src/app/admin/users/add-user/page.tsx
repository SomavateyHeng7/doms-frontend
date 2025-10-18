"use client"

import { useState } from "react"

export default function AddUserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "Active",
  })
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
  <div className="min-h-screen bg-[#f5f6fa] flex text-gray-900">

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10">
  <div className="w-full max-w-xl bg-white rounded-lg shadow p-8 text-gray-900">
          <h1 className="text-2xl font-bold mb-6">Add User</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Role</label>
              <select name="role" value={form.role} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option value="">Select role</option>
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Officer">Officer</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Department</label>
              <input name="department" value={form.department} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add User</button>
            {success && <div className="text-green-600 mt-2">User added successfully!</div>}
          </form>
        </div>
      </main>
    </div>
  )
}
