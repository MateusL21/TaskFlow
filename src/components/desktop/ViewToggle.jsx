import { LayoutGrid, LayoutList } from "lucide-react";

const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex items-center gap-1 bg-secondary-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === "grid"
            ? "bg-white shadow-sm text-primary-600"
            : "text-secondary-500 hover:text-secondary-700"
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === "list"
            ? "bg-white shadow-sm text-primary-600"
            : "text-secondary-500 hover:text-secondary-700"
        }`}
      >
        <LayoutList className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ViewToggle;
