"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HelpCircle, UserPlus, Edit, Ban, Trash2, CheckCircle } from "lucide-react";

interface BrokerManagementGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BrokerManagementGuideDialog({
  open,
  onOpenChange,
}: BrokerManagementGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Broker Management Guide
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Add Broker</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click "Add Broker" to create a new broker account. Enter their name and email address.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-lg p-2 flex-shrink-0">
                <Edit className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Edit Broker</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click the edit icon to update broker information such as name and email.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-amber-100 rounded-lg p-2 flex-shrink-0">
                <Ban className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Suspend/Unsuspend Broker</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Temporarily suspend a broker to restrict their access without deleting their account. Click again to unsuspend.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-red-100 rounded-lg p-2 flex-shrink-0">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delete Broker</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Permanently remove a broker account. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monitor assigned requests to see broker workload</li>
                  <li>• Active brokers are shown with a green badge</li>
                  <li>• Use the stats cards to get an overview of your broker team</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
