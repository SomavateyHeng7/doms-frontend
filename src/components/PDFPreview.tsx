"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function PDFPreview() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const pdfFile = "/sample.pdf" // Place sample.pdf in public folder

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <main className="flex flex-1 flex-col items-center py-10">
        <div className="w-full max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <button className="text-2xl text-gray-700 font-light">&larr;</button>
            <h2 className="text-2xl font-semibold text-gray-900">Export Report</h2>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-[#ededed] border-4 border-blue-400 rounded-lg flex items-center justify-center" style={{ width: 400, height: 500 }}>
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<span className="text-lg text-gray-500">Loading PDF...</span>}
                error={<span className="text-lg text-red-500">Failed to load PDF.</span>}
              >
                <Page pageNumber={pageNumber} width={350} />
              </Document>
            </div>
          </div>
          {numPages && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700"
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                Previous
              </button>
              <span className="text-gray-700">Page {pageNumber} of {numPages}</span>
              <button
                className="px-3 py-1 rounded bg-gray-200 text-gray-700"
                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
