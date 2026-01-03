"use client";

interface ApproveDocProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor?: "green" | "red" | "blue";
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmLabel,
  confirmColor = "blue",
  onConfirm,
}: ApproveDocProps) {
  if (!open) return null;

  const confirmButtonClass =
    confirmColor === "green"
      ? "bg-green-600 hover:bg-green-700"
      : confirmColor === "red"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${confirmButtonClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
