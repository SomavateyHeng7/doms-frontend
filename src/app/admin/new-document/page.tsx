"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader"
import { Upload } from "lucide-react"

export default function CreateDocumentPage() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    file: null as File | null,
  })

  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.file) {
      alert("Please upload a PDF file")
      return
    }

    console.log(form)
    // submit logic here
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      setForm((prev) => ({ ...prev, file }))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm((prev) => ({ ...prev, file }))
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <PageHeader title="Create New Document" />

      <div className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Create New Document
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              >
                <option value="">Select type</option>
                <option value="Report">Report</option>
                <option value="Invoice">Invoice</option>
                <option value="Contract">Contract</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Upload File <span className="text-red-500">*</span>
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-3" />

                <p className="text-sm font-medium text-gray-700">
                  Choose a file or drag & drop it here
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  PDF format, up to 50MB
                </p>

                <label className="cursor-pointer">
                  <span className="inline-block px-5 py-2 border rounded-lg text-sm font-medium">
                    Browse File
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                    required
                  />
                </label>

                {form.file && (
                  <div className="mt-3 text-sm text-gray-700">
                    Selected:{" "}
                    <span className="font-medium">{form.file.name}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Create Document
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
