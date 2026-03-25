import { LayoutGrid } from "lucide-react";
import { PRIORITY_OPTIONS, DEFAULT_CATEGORIES } from "../../utils/constants";

const DesktopSidebar = ({
  totalTasks,
  completedCount,
  progress,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="space-y-3">
        {/* Stats Cards - Versão Desktop Compacta */}
        <div className="bg-white rounded-xl border border-secondary-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">
              Resumo
            </h3>
            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-4 h-4 text-primary-500" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">
                Total de tarefas
              </span>
              <span className="text-2xl font-bold text-secondary-900">
                {totalTasks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Concluídas</span>
              <span className="text-2xl font-bold text-green-600">
                {completedCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Progresso</span>
              <span className="text-2xl font-bold text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-full h-2 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filtros Rápidos - Desktop */}
        <div className="bg-white rounded-xl border border-secondary-100 p-4 shadow-sm">
          <h3 className="text-xs font-semibold text-secondary-400 uppercase tracking-wider mb-3">
            Filtros Rápidos
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-secondary-600 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  onFilterChange({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-secondary-200 bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary-600 mb-1">
                Prioridade
              </label>
              <select
                value={filters.priority}
                onChange={(e) =>
                  onFilterChange({ ...filters, priority: e.target.value })
                }
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-secondary-200 bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todas</option>
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary-600 mb-1">
                Categoria
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  onFilterChange({ ...filters, category: e.target.value })
                }
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-secondary-200 bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todas</option>
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {(filters.status !== "all" ||
              filters.priority !== "all" ||
              filters.category !== "all") && (
              <button
                onClick={onClearFilters}
                className="w-full mt-2 py-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
