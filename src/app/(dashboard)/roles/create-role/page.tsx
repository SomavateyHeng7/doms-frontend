"use client"

import { useState } from "react"

export default function CreateRolePage() {
  const [form, setForm] = useState<{
    name: string
    description: string
    permissions: string[]
    status: string
  }>({
    name: "",
    description: "",
    permissions: [],
    status: "Active",
  })
  const [success, setSuccess] = useState(false)

  const permissionOptions = [
    "Read",
    "Write",
    "Approve",
    "Delete",
    "Manage Users",
    "Manage Roles",
    "Manage Pipelines",
    "Manage Documents",
    "Read Limited",
  ]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handlePermissionChange(permission: string) {
    setForm((prev) => {
      const exists = prev.permissions.includes(permission)
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((p) => p !== permission)
          : [...prev.permissions, permission],
      }
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col py-8 px-6">
        <h2 className="text-2xl font-bold mb-8">OfficeSync</h2>
        <nav className="flex flex-col gap-4">
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="/manage-documents" className="text-gray-700 hover:text-blue-600">Manage Documents</a>
          <a href="/pipelines" className="text-gray-700 hover:text-blue-600">Manage Pipelines</a>
          <a href="/roles" className="text-gray-700 hover:text-blue-600 font-semibold">Manage Roles</a>
          <a href="/users" className="text-gray-700 hover:text-blue-600">Manage Users</a>
          <a href="/trash-documents" className="text-gray-700 hover:text-blue-600">Trash Documents</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10">
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-6">Create Role</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Role Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required className="w-full px-3 py-2 border rounded" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {permissionOptions.map((perm) => (
                  <label key={perm} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(perm)}
                      onChange={() => handlePermissionChange(perm)}
                    />
                    <span>{perm}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Role</button>
            {success && <div className="text-green-600 mt-2">Role created successfully!</div>}
          </form>
        </div>
      </main>
    </div>
  )
}
