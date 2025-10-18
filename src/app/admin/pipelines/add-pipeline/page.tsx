"use client"

import { useState } from "react"

export default function AddPipelinePage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    steps: "",
    users: "",
    status: "Active",
  })
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10">
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold mb-6">Add Pipeline</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Pipeline Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required className="w-full px-3 py-2 border rounded" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Steps</label>
              <input name="steps" value={form.steps} onChange={handleChange} required className="w-full px-3 py-2 border rounded" placeholder="e.g. 5 steps" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Users</label>
              <input name="users" value={form.users} onChange={handleChange} required className="w-full px-3 py-2 border rounded" placeholder="e.g. 12 users" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Pipeline</button>
            {success && <div className="text-green-600 mt-2">Pipeline added successfully!</div>}
          </form>
        </div>
      </main>
    </div>
  )
}
