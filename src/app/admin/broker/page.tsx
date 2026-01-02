"use client";

import {
  Edit,
  Trash,
  HelpCircle,
  UserPlus,
  Ban,
  CheckCircle,
  Users,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/components/ui/toast";
import {
  InviteBrokerDialog,
  EditBrokerDialog,
  DeleteBrokerDialog,
  BrokerManagementGuideDialog,
} from "@/components/admin/broker";

interface Broker {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended";
  assignedRequests: number;
  lastActive: string;
  profilePicture?: string;
}

const brokers: Broker[] = [
  {
    id: "BRK001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    assignedRequests: 12,
    lastActive: "5 min ago",
  },
  {
    id: "BRK002",
    name: "Michael Chen",
    email: "michael.c@example.com",
    status: "active",
    assignedRequests: 8,
    lastActive: "1 hour ago",
  },
  {
    id: "BRK003",
    name: "Emily Davis",
    email: "emily.d@example.com",
    status: "suspended",
    assignedRequests: 15,
    lastActive: "2 days ago",
  },
  {
    id: "BRK004",
    name: "David Williams",
    email: "david.w@example.com",
    status: "active",
    assignedRequests: 6,
    lastActive: "30 min ago",
  },
  {
    id: "BRK005",
    name: "Jessica Brown",
    email: "jessica.b@example.com",
    status: "active",
    assignedRequests: 10,
    lastActive: "15 min ago",
  },
];

export default function BrokerPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addToast } = useToast();
  const [brokersList, setBrokersList] = useState<Broker[]>(brokers);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  const handleToggleBrokerStatus = (broker: Broker) => {
    const newStatus = broker.status === "active" ? "suspended" : "active";
    setBrokersList((prev) =>
      prev.map((b) => (b.id === broker.id ? { ...b, status: newStatus } : b))
    );
    addToast({
      title: "Success",
      description: `Broker ${
        newStatus === "suspended" ? "suspended" : "unsuspended"
      } successfully`,
      variant: "success",
    });
  };

  const handleDeleteBroker = () => {
    if (!selectedBroker) return;
    setBrokersList((prev) => prev.filter((b) => b.id !== selectedBroker.id));
    setShowDeleteDialog(false);
    setSelectedBroker(null);
    addToast({
      title: "Success",
      description: "Broker deleted successfully",
      variant: "success",
    });
  };

  const handleInviteBroker = (data: { name: string; email: string }) => {
    const newBroker: Broker = {
      id: `BRK${String(brokersList.length + 1).padStart(3, "0")}`,
      name: data.name,
      email: data.email,
      status: "active",
      assignedRequests: 0,
      lastActive: "Just now",
    };
    setBrokersList((prev) => [...prev, newBroker]);
    setShowInviteDialog(false);
    addToast({
      title: "Success",
      description: "Broker added successfully",
      variant: "success",
    });
  };

  const handleEditBroker = (data: { name: string; email: string }) => {
    if (!selectedBroker) return;
    setBrokersList((prev) =>
      prev.map((b) =>
        b.id === selectedBroker.id
          ? { ...b, name: data.name, email: data.email }
          : b
      )
    );
    setShowEditDialog(false);
    setSelectedBroker(null);
    addToast({
      title: "Success",
      description: "Broker updated successfully",
      variant: "success",
    });
  };

  const openDeleteDialog = (broker: Broker) => {
    setSelectedBroker(broker);
    setShowDeleteDialog(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={t("nav.brokers")} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Broker Management
                </h2>
                <button
                  onClick={() => setShowGuideDialog(true)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Help"
                >
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => setShowInviteDialog(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Broker</span>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Manage brokers and their assigned document requests
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Brokers</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {brokersList.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Brokers</p>
                  <p className="text-2xl font-semibold text-green-600 mt-1">
                    {brokersList.filter((b) => b.status === "active").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Suspended</p>
                  <p className="text-2xl font-semibold text-red-600 mt-1">
                    {brokersList.filter((b) => b.status === "suspended").length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Ban className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {brokersList.reduce((acc, b) => acc + b.assignedRequests, 0)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Brokers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Broker ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Requests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {brokersList.map((broker, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {broker.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium text-gray-700">
                              {broker.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {broker.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {broker.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            broker.status === "suspended"
                              ? "bg-red-600 text-white"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {broker.status === "suspended"
                            ? "Suspended"
                            : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {broker.assignedRequests} requests
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {broker.lastActive}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedBroker(broker);
                              setShowEditDialog(true);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="Edit Broker"
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleToggleBrokerStatus(broker)}
                            className={`p-1.5 rounded transition-colors ${
                              broker.status === "active"
                                ? "text-orange-600 hover:bg-orange-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={
                              broker.status === "active"
                                ? "Suspend Broker"
                                : "Unsuspend Broker"
                            }
                          >
                            {broker.status === "active" ? (
                              <Ban className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => openDeleteDialog(broker)}
                            className="p-1.5 hover:bg-red-50 rounded transition-colors"
                            title="Delete Broker"
                          >
                            <Trash className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Dialog Components */}
      <InviteBrokerDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onSubmit={handleInviteBroker}
      />

      <EditBrokerDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        broker={selectedBroker}
        onSubmit={handleEditBroker}
      />

      <DeleteBrokerDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        brokerName={selectedBroker?.name}
        onConfirm={handleDeleteBroker}
      />

      <BrokerManagementGuideDialog
        open={showGuideDialog}
        onOpenChange={setShowGuideDialog}
      />
    </div>
  );
}
