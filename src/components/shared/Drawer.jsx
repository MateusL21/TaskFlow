import { useEffect } from "react";
import { X } from "lucide-react";

const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in md:hidden"
        onClick={onClose}
      />

      {/* Drawer - Mais compacto */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-elegant z-50 animate-slide-in-right md:hidden">
        {/* Header - Mais compacto */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary-100">
          <h2 className="text-base font-semibold text-secondary-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Mais compacto */}
        <div className="p-4 overflow-y-auto h-[calc(100%-52px)]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
