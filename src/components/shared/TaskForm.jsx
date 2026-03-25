import { useState, useEffect } from "react";
import Button from "./Button";
import {
  PRIORITIES,
  PRIORITY_OPTIONS,
  DEFAULT_CATEGORIES,
} from "../../utils/constants";

const TaskForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: PRIORITIES.MEDIUM,
    category: "personal",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || PRIORITIES.MEDIUM,
        category: initialData.category || "personal",
        dueDate: initialData.dueDate || "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Mínimo 3 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
      {/* Título - Mais compacto */}
      <div className="space-y-1">
        <label className="block text-xs md:text-sm font-medium text-secondary-700">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Digite o título"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={`
            w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg border text-sm md:text-base
            ${
              errors.title
                ? "border-red-300 focus:ring-red-500"
                : "border-secondary-200 focus:ring-primary-500"
            }
            bg-white text-secondary-900 placeholder-secondary-400
            focus:outline-none focus:ring-2 focus:border-transparent
            transition-all duration-200
          `}
          autoFocus
        />
        {errors.title && <p className="text-xs text-red-600">{errors.title}</p>}
      </div>

      {/* Descrição */}
      <div className="space-y-1">
        <label className="block text-xs md:text-sm font-medium text-secondary-700">
          Descrição
        </label>
        <textarea
          placeholder="Descrição (opcional)"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={2}
          className="w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-secondary-200 
                     bg-white text-secondary-900 placeholder-secondary-400 text-sm md:text-base
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     transition-all duration-200 resize-none"
        />
      </div>

      {/* Prioridade e Categoria - Grid mais compacto */}
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="space-y-1">
          <label className="block text-xs md:text-sm font-medium text-secondary-700">
            Prioridade
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="w-full px-2 py-1.5 md:px-3 md:py-2 rounded-lg border border-secondary-200 
                       bg-white text-secondary-900 text-sm md:text-base
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs md:text-sm font-medium text-secondary-700">
            Categoria
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-2 py-1.5 md:px-3 md:py-2 rounded-lg border border-secondary-200 
                       bg-white text-secondary-900 text-sm md:text-base
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data de vencimento */}
      <div className="space-y-1">
        <label className="block text-xs md:text-sm font-medium text-secondary-700">
          Data de vencimento
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          className="w-full px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-secondary-200 
                     bg-white text-secondary-900 text-sm md:text-base
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Botões - Mais compactos em mobile */}
      <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="flex-1 py-2 md:py-2.5 text-sm md:text-base"
        >
          {isEditing ? "Atualizar" : "Adicionar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
          className="px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
