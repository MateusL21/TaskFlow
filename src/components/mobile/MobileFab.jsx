import { Plus } from "lucide-react";

const MobileFab = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4 md:hidden">
      <button
        onClick={onClick}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MobileFab;
