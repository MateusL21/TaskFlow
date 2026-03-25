import Drawer from "./Drawer";
import { PRIORITY_OPTIONS, DEFAULT_CATEGORIES } from "../../utils/constants";

const FiltersDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Filtros">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 bg-white text-secondary-900"
          >
            <option value="all">Todos os status</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Prioridade
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 bg-white text-secondary-900"
          >
            <option value="all">Todas prioridades</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Categoria
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-secondary-200 bg-white text-secondary-900"
          >
            <option value="all">Todas categorias</option>
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
            className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    </Drawer>
  );
};

export default FiltersDrawer;
