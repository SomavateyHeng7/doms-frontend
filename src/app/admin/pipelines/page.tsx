"use client";

import {
  Plus,
  Edit,
  Trash,
  Users,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { useToast } from "@/components/ui/toast";
import CreatePipelineDialog from "@/components/admin/pipelines/CreatePipelineDialog";
import EditPipelineDialog from "@/components/admin/pipelines/EditPipelineDialog";
import DeletePipelineDialog from "@/components/admin/pipelines/DeletePipelineDialog";
import AssignUsersDialog from "@/components/admin/pipelines/AssignUsersDialog";
import PipelineManagementGuide from "@/components/admin/pipelines/PipelineManagementGuide";

interface Pipeline {
  id: string;
  name: string;
  createdAt: string;
}

const initialPipelines: Pipeline[] = [
  {
    id: "1",
    name: "Computer Science Page pipeline",
    createdAt: "5/13/2025, 9:19:29 PM",
  },
  {
    id: "2",
    name: "Computer",
    createdAt: "5/13/2025, 10:15:03 PM",
  },
  {
    id: "3",
    name: "asdasdasdfsdfasdf",
    createdAt: "5/13/2025, 10:15:55 PM",
  },
  {
    id: "4",
    name: "1",
    createdAt: "5/13/2025, 10:16:11 PM",
  },
];

export default function PipelinesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addToast } = useToast();
  const [pipelinesList, setPipelinesList] =
    useState<Pipeline[]>(initialPipelines);
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [assignUsersDialog, setAssignUsersDialog] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(
    null
  );
  const [pipelineName, setPipelineName] = useState("");

  const handleCreatePipeline = () => {
    setPipelineName("");
    setCreateDialog(true);
  };

  const handleEditPipeline = (pipeline: Pipeline) => {
    setSelectedPipeline(pipeline);
    setPipelineName(pipeline.name);
    setEditDialog(true);
  };

  const handleAssignUsers = (pipeline: Pipeline) => {
    setSelectedPipeline(pipeline);
    setAssignUsersDialog(true);
  };

  const handleDeleteClick = (pipeline: Pipeline) => {
    setSelectedPipeline(pipeline);
    setDeleteDialog(true);
  };

  const handleSubmitCreate = () => {
    if (!pipelineName.trim()) return;

    const newPipeline: Pipeline = {
      id: String(pipelinesList.length + 1),
      name: pipelineName,
      createdAt: new Date().toLocaleString(),
    };
    setPipelinesList((prev) => [...prev, newPipeline]);
    setCreateDialog(false);
    setPipelineName("");
    addToast({
      title: "Success",
      description: "Pipeline created successfully",
      variant: "success",
    });
  };

  const handleSubmitEdit = () => {
    if (!selectedPipeline || !pipelineName.trim()) return;

    setPipelinesList((prev) =>
      prev.map((p) =>
        p.id === selectedPipeline.id ? { ...p, name: pipelineName } : p
      )
    );
    setEditDialog(false);
    setPipelineName("");
    addToast({
      title: "Success",
      description: "Pipeline updated successfully",
      variant: "success",
    });
  };

  const handleConfirmDelete = () => {
    if (!selectedPipeline) return;

    setPipelinesList((prev) =>
      prev.filter((p) => p.id !== selectedPipeline.id)
    );
    setDeleteDialog(false);
    setSelectedPipeline(null);
    addToast({
      title: "Success",
      description: "Pipeline deleted successfully",
      variant: "success",
    });
  };

  const handleSaveUsers = (userIds: string[]) => {
    // TODO: Implement user assignment logic
    console.log("Assigned users:", userIds);
    addToast({
      title: "Success",
      description: `Assigned ${userIds.length} user(s) to pipeline`,
      variant: "success",
    });
  };

  const filteredPipelines = pipelinesList.filter((pipeline) =>
    pipeline.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader title={t("pipelines.title")} />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Pipeline Management
                </h2>
                <PipelineManagementGuide
                  show={showInfo}
                  onToggle={() => setShowInfo(!showInfo)}
                />
              </div>
              <button
                onClick={handleCreatePipeline}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                <Plus className="h-4 w-4" />
                Create Pipeline
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Configure publishing pipelines and workflows
            </p>
            <div className="border-t my-4"></div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pipelines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Pipelines Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Pipeline
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPipelines.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 mb-2">No Pipelines Found</p>
                        <button
                          onClick={handleCreatePipeline}
                          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Create Pipeline
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPipelines.map((pipeline) => (
                    <tr
                      key={pipeline.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-blue-500 rounded-full"></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {pipeline.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {pipeline.createdAt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditPipeline(pipeline)}
                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Pipeline"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAssignUsers(pipeline)}
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                            title="Assign Users"
                          >
                            <Users className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(pipeline)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Pipeline"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <CreatePipelineDialog
        open={createDialog}
        onOpenChange={setCreateDialog}
        pipelineName={pipelineName}
        onPipelineNameChange={setPipelineName}
        onSubmit={handleSubmitCreate}
      />

      <EditPipelineDialog
        open={editDialog}
        onOpenChange={setEditDialog}
        pipelineName={pipelineName}
        onPipelineNameChange={setPipelineName}
        onSubmit={handleSubmitEdit}
      />

      <DeletePipelineDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        pipelineName={selectedPipeline?.name}
        onConfirm={handleConfirmDelete}
      />

      <AssignUsersDialog
        open={assignUsersDialog}
        onOpenChange={setAssignUsersDialog}
        pipelineName={selectedPipeline?.name}
        users={[]}
        selectedUserIds={[]}
        onSave={handleSaveUsers}
      />
    </div>
  );
}
