import Button from "../shared/Button";
import SearchBar from "../shared/SearchBar";
import EmptyState from "../shared/EmptyState";
import Pagination from "../shared/Pagination";
import TaskCard from "../shared/TaskCard";
import ViewToggle from "./ViewToggle";
import DesktopHeader from "./DesktopHeader";
import DesktopSidebar from "./DesktopSidebar";
import { Plus } from "lucide-react";

const DesktopLayout = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  activeFiltersCount,
  totalTasks,
  completedCount,
  progress,
  filters,
  onFilterChange,
  onClearFilters,
  currentTasks,
  viewMode,
  onViewModeChange,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onAddTask,
  hasFilters,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  filteredTasksLength,
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <DesktopHeader />

      <div className="flex flex-row gap-6">
        {/* Sidebar */}
        <DesktopSidebar
          totalTasks={totalTasks}
          completedCount={completedCount}
          progress={progress}
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />

        {/* Conteúdo Principal */}
        <div className="flex-1">
          {/* Barra de Busca */}
          <div className="mb-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              onFilterClick={onFilterClick}
              activeFiltersCount={activeFiltersCount}
              isDesktop={true}
            />
          </div>

          {/* Botão Nova Tarefa e Visualização */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <Button
              onClick={onAddTask}
              className="shadow-sm hover:shadow-md py-2 text-sm"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Nova Tarefa
            </Button>
            <ViewToggle viewMode={viewMode} onViewChange={onViewModeChange} />
          </div>

          {/* Tasks List */}
          {currentTasks.length === 0 ? (
            <EmptyState
              hasFilters={hasFilters}
              onClearFilters={onClearFilters}
            />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onToggle={onToggleTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {currentTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onToggle={onToggleTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}

          {/* Paginação */}
          {filteredTasksLength > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
