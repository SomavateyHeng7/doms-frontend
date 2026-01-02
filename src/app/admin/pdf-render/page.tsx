"use client"
export const dynamic = 'force-dynamic'

import DynamicPDFPreview from "@/components/DynamicPDFPreview"
import PageHeader from "@/components/shared/PageHeader"

export default function PDFRenderPage() {
  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <PageHeader title="PDF Renderer" />

      {/* PDF Content */}
      <div className="flex-1">
        <DynamicPDFPreview />
      </div>
    </div>
  )
}