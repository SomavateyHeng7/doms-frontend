"use client"

import { useState } from "react"

export default function CreateDocumentPage() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    file: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    const files = (target as HTMLInputElement).files;
    setForm(prev => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic here
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center py-6 sm:py-12 px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Create New Document</h2>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
              placeholder="Enter document name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
              required
            >
              <option value="">Select type</option>
              <option value="Report">Report</option>
              <option value="Invoice">Invoice</option>
              <option value="Contract">Contract</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
              rows={3}
              placeholder="Add a description (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white text-sm sm:text-base file:mr-3 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2.5 sm:py-3 font-semibold text-base sm:text-lg hover:bg-blue-700 transition touch-manipulation"
          >
            Create Document
          </button>
        </form>
      </div>
    </div>
  )
}