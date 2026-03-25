import { Search, Filter } from "lucide-react";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  activeFiltersCount,
}) => {
  return (
    <div className="mb-3 md:mb-6 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-secondary-400" />
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-12 py-2 md:py-3 rounded-lg border border-secondary-200 
                     bg-white text-secondary-900 placeholder-secondary-400 text-sm md:text-base
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={onFilterClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg bg-primary-50 text-primary-600 md:hidden"
        >
          <Filter className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full text-[8px] text-white flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        {/* Desktop filter button */}
        <button
          onClick={onFilterClick}
          className={`hidden md:flex absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors
                     ${activeFiltersCount > 0 ? "text-primary-600 bg-primary-50" : "text-secondary-400 hover:text-secondary-600"}`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
