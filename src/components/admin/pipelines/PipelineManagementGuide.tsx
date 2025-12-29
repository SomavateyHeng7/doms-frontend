"use client";

import { useEffect, useRef } from "react";
import { Info, X } from "lucide-react";

interface PipelineManagementGuideProps {
  show: boolean;
  onToggle: () => void;
}

export default function PipelineManagementGuide({
  show,
  onToggle,
}: PipelineManagementGuideProps) {
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        if (show) {
          onToggle();
        }
      }
    };

    if (show) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show, onToggle]);

  return (
    <div className="relative" ref={infoRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        title="Click for pipeline management guide"
      >
        <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
      </button>

      {show && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">
              Pipeline Management Guide
            </h3>
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>View all available publishing pipelines</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>Create new approval workflows</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>Assign approvers to pipelines</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>Edit pipeline configurations</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
              <span>Delete unused pipelines</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 text-gray-500">
              💡 <span className="font-medium">Tip:</span> Use the search bar to
              quickly find specific pipelines
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
