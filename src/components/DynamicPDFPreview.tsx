"use client"

import dynamic from 'next/dynamic'

const PDFPreview = dynamic(() => import('./PDFPreview'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <main className="flex flex-1 flex-col items-center py-10">
        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <button className="text-2xl text-gray-700 font-light">&larr;</button>
            <h2 className="text-2xl font-semibold text-gray-900">Export Report</h2>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-[#ededed] border-4 border-blue-400 rounded-lg flex items-center justify-center" style={{ width: 400, height: 500 }}>
              <span className="text-lg text-gray-500">Loading PDF...</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
})

export default PDFPreview