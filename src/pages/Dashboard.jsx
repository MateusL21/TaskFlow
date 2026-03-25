import { useState, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";
import Drawer from "../components/shared/Drawer";
import Modal from "../components/shared/Modal";
import TaskForm from "../components/shared/TaskForm";
import FiltersDrawer from "../components/shared/FiltersDrawer";
import DesktopLayout from "../components/desktop/DesktopLayout";
import MobileLayout from "../components/mobile/MobileLayout";
import MobileFab from "../components/mobile/MobileFab";

function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();

  // Estados
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [viewMode, setViewMode] = useState("list");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
  });

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        setItemsPerPage(9);
        setViewMode("grid");
      } else {
        setItemsPerPage(4);
        setViewMode("list");
      }
      setCurrentPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Resetar página quando filtros ou busca mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "completed" && task.isCompleted) ||
      (filters.status === "pending" && !task.isCompleted);
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;
    const matchesCategory =
      filters.category === "all" || task.category === filters.category;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Paginação
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  const completedCount = filteredTasks.filter((t) => t.isCompleted).length;
  const progress =
    filteredTasks.length > 0
      ? (completedCount / filteredTasks.length) * 100
      : 0;
  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "all",
  ).length;
  const hasFilters = searchTerm !== "" || activeFiltersCount > 0;

  // Handlers
  const handleAddTask = (taskData) => {
    addTask(
      taskData.title,
      taskData.description,
      taskData.priority,
      taskData.category,
      taskData.dueDate,
    );
    setIsAddDrawerOpen(false);
  };

  const handleEditTask = (taskData) => {
    updateTask(editingTask.id, {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      category: taskData.category,
      dueDate: taskData.dueDate,
    });
    setEditingTask(null);
    setIsEditDrawerOpen(false);
  };

  const openEditDrawer = (task) => {
    setEditingTask(task);
    setIsEditDrawerOpen(true);
  };

  const clearFilters = () => {
    setFilters({ status: "all", priority: "all", category: "all" });
    setSearchTerm("");
    setIsFilterDrawerOpen(false);
  };

  const TaskFormWrapper = ({ onSubmit, onCancel, initialData, isEditing }) => (
    <TaskForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialData={initialData}
      isEditing={isEditing}
    />
  );

  // Props compartilhadas
  const commonProps = {
    searchTerm,
    onSearchChange: setSearchTerm,
    onFilterClick: () => setIsFilterDrawerOpen(true),
    activeFiltersCount,
    totalTasks: filteredTasks.length,
    completedCount,
    progress,
    currentTasks,
    onToggleTask: toggleTask,
    onEditTask: openEditDrawer,
    onDeleteTask: deleteTask,
    onAddTask: () => setIsAddDrawerOpen(true),
    hasFilters,
    onClearFilters: clearFilters,
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    itemsPerPage,
    totalItems: filteredTasks.length,
    filteredTasksLength: filteredTasks.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 pb-20 md:pb-8">
      {isDesktop ? (
        <DesktopLayout
          {...commonProps}
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      ) : (
        <MobileLayout {...commonProps} />
      )}

      {/* Drawers e Modais */}
      <Drawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        title="Nova Tarefa"
      >
        <TaskFormWrapper
          onSubmit={handleAddTask}
          onCancel={() => setIsAddDrawerOpen(false)}
        />
      </Drawer>

      <Drawer
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        title="Editar Tarefa"
      >
        {editingTask && (
          <TaskFormWrapper
            onSubmit={handleEditTask}
            onCancel={() => setIsEditDrawerOpen(false)}
            initialData={editingTask}
            isEditing={true}
          />
        )}
      </Drawer>

      <FiltersDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Versão Desktop - Modais */}
      {isDesktop && (
        <>
          <Modal
            isOpen={isAddDrawerOpen}
            onClose={() => setIsAddDrawerOpen(false)}
            title="Nova Tarefa"
          >
            <TaskFormWrapper
              onSubmit={handleAddTask}
              onCancel={() => setIsAddDrawerOpen(false)}
            />
          </Modal>
          <Modal
            isOpen={isEditDrawerOpen}
            onClose={() => setIsEditDrawerOpen(false)}
            title="Editar Tarefa"
          >
            {editingTask && (
              <TaskFormWrapper
                onSubmit={handleEditTask}
                onCancel={() => setIsEditDrawerOpen(false)}
                initialData={editingTask}
                isEditing={true}
              />
            )}
          </Modal>
        </>
      )}

      {/* FAB Mobile */}
      <MobileFab onClick={() => setIsAddDrawerOpen(true)} />
    </div>
  );
}

export default Dashboard;
