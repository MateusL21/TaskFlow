import Button from "../shared/Button";
import StatsCards from "../shared/StatsCards";
import SearchBar from "../shared/SearchBar";
import EmptyState from "../shared/EmptyState";
import Pagination from "../shared/Pagination";
import TaskCard from "../shared/TaskCard";
import MobileHeader from "./MobileHeader";
import { Plus } from "lucide-react";

const MobileLayout = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  activeFiltersCount,
  totalTasks,
  completedCount,
  progress,
  currentTasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onAddTask,
  hasFilters,
  onClearFilters,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  filteredTasksLength,
}) => {
  return (
    <div className="container mx-auto px-4 py-3 max-w-4xl">
      <MobileHeader />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onFilterClick={onFilterClick}
        activeFiltersCount={activeFiltersCount}
        isDesktop={false}
      />

      <StatsCards
        total={totalTasks}
        completed={completedCount}
        progress={progress}
      />

      <div className="mb-4">
        <Button
          onClick={onAddTask}
          className="w-full shadow-lg hover:shadow-xl py-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="space-y-2 pb-4">
        {currentTasks.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />
        ) : (
          currentTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>

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
  );
};

export default MobileLayout;
