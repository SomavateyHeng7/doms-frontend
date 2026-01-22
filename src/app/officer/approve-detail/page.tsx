"use client"

import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link";
import { OfficerSidebar, PageHeader } from "@/components/officer"
import { ConfirmDialog } from "@/components/shared"
import { ApproveDoc, RejectDoc } from "@/components/officer/docs"


interface TimelineStep {
  label: string
  status: "completed" | "current" | "pending"
  timestamp: string
}

const timelineSteps: TimelineStep[] = [
  { label: "Request Created", status: "completed", timestamp: "Jul 15, 2025, 11:02 AM" },
  { label: "P1", status: "completed", timestamp: "Jul 15, 2025, 1:45 AM" },
  { label: "P2", status: "completed", timestamp: "Jul 15, 2025, 1:45 AM" },
  { label: "P3", status: "current", timestamp: "Jul 15, 2025, 11:02 AM" },
]

export default function ApprovalDetail() {
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const handleApprove = () => {
    // Handle approve logic
    console.log("Document approved")
  }

  const handleReject = () => {
    // Handle reject logic
    console.log("Document rejected")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OfficerSidebar />

      <div className="flex-1 flex flex-col">
        <PageHeader title="Approval Details" />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Back Button and Title */}
            <div className="mb-6 flex items-center gap-3">
              <Link
                href="/officer/assign-request"
                className="flex items-center text-gray-900 hover:text-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>

              <h1 className="text-2xl font-normal text-gray-900">
                Export Report
              </h1>
            </div>

            {/* Approval Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-4">Approval Timeline</h2>

{/* Progress Label */}
              <div className="text-xs text-gray-500 mb-2">Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="flex items-center justify-between">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 relative">
                      {/* Line before circle (except first) */}
                      {index > 0 && (
                        <div 
                          className={`absolute h-0.5 top-5 right-1/2 w-full ${
                            step.status === "completed" ? "bg-blue-500" : "bg-gray-300"
                          }`}
                          style={{ transform: "translateX(50%)" }}
                        />
                      )}
                      
                      {/* Circle */}
                      <div className="relative z-10 mb-2">
                        {step.status === "completed" && (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        {step.status === "current" && (
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                        {step.status === "pending" && (
                          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      
                      {/* Label */}
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-900">{step.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{step.timestamp}</div>
                      </div>
                      
                      {/* Line after circle (except last) */}
                      {index < timelineSteps.length - 1 && (
                        <div 
                          className={`absolute h-0.5 top-5 left-1/2 w-full ${
                            timelineSteps[index + 1].status === "completed" || timelineSteps[index + 1].status === "current" 
                              ? "bg-blue-500" 
                              : "bg-gray-300"
                          }`}
                          style={{ transform: "translateX(50%)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="space-y-4">
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-40 text-sm text-gray-700">Request Name:</div>
                  <div className="flex-1 text-sm text-gray-900">Export Report</div>
                </div>
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-40 text-sm text-gray-700">Requester:</div>
                  <div className="flex-1 text-sm text-gray-900">LIM</div>
                </div>
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-40 text-sm text-gray-700">Document ID:</div>
                  <div className="flex-1 text-sm text-gray-900">10101001</div>
                </div>
                <div className="flex border-b border-gray-200 pb-4">
                  <div className="w-40 text-sm text-gray-700">Status:</div>
                  <div className="flex-1">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                      Pending
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-gray-700">Created Time:</div>
                  <div className="flex-1 text-sm text-gray-900">Jul 15, 2025, 11:12 AM</div>
                </div>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="bg-white rounded-lg border border-gray-200 p-12 mb-6 min-h-[400px] flex items-center justify-center">
              {showPdfViewer ? (
                <div className="w-full h-full">
                  {/* PDF content would go here */}
                  <div className="text-gray-400">PDF Preview</div>
                </div>
              ) : (
                <div className="text-4xl font-light text-gray-900">PDF</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowRejectDialog(true)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reject
              </button>
              <button 
                onClick={() => setShowApproveDialog(true)}
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Approve
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* <dialog> */}
      <ApproveDoc
          open={showApproveDialog}
          onOpenChange={setShowApproveDialog}
          title="Approve Confirmation"
          message="Are you sure you want to approve this Document?"
          confirmLabel="Approve"
          confirmColor="green"
          onConfirm={handleApprove}
      />

      <RejectDoc
          open={showRejectDialog}
          onOpenChange={setShowRejectDialog}
          title="Reject Confirmation"
          message="Are you sure you want to reject this Document?"
          confirmLabel="Reject"
          confirmColor="red"
          onConfirm={handleReject}
      />
    </div>
  )
}
