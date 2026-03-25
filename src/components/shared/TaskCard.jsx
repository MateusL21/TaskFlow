import { Check, Trash2, Calendar, Edit } from "lucide-react";
import Card from "./Card";
import { PRIORITY_OPTIONS, DEFAULT_CATEGORIES } from "../../utils/constants";

const TaskCard = ({ task, onToggle, onEdit, onDelete, index }) => {
  const getPriorityColor = (priority) => {
    const option = PRIORITY_OPTIONS.find((p) => p.value === priority);
    return option?.color || "text-gray-600 bg-gray-50";
  };

  const getCategoryName = (categoryId) => {
    const category = DEFAULT_CATEGORIES.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      work: "bg-blue-50 text-blue-600",
      personal: "bg-green-50 text-green-600",
      study: "bg-purple-50 text-purple-600",
      shopping: "bg-orange-50 text-orange-600",
      health: "bg-red-50 text-red-600",
    };
    return colors[categoryId] || "bg-gray-50 text-gray-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Hoje";
    if (date.toDateString() === tomorrow.toDateString()) return "Amanhã";
    return date.toLocaleDateString("pt-BR");
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <Card
      hover
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-2.5 md:p-4">
        <div className="flex items-start gap-2 md:gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`
              flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-md border-2 transition-all duration-200
              flex items-center justify-center mt-0.5
              ${
                task.isCompleted
                  ? "bg-green-500 border-green-500"
                  : "border-secondary-300 hover:border-primary-400"
              }
            `}
          >
            {task.isCompleted && (
              <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p
                  className={`
                  font-medium text-xs md:text-base
                  ${task.isCompleted ? "line-through text-secondary-400" : "text-secondary-900"}
                `}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-[10px] md:text-sm text-secondary-500 mt-0.5 line-clamp-1 md:line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-0.5 md:gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1 md:p-2 text-secondary-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Edit className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 md:p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            {/* Badges and Date */}
            <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1 md:mt-2">
              <span
                className={`text-[9px] md:text-xs px-1 py-0.5 md:px-2 md:py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}
              >
                {PRIORITY_OPTIONS.find((p) => p.value === task.priority)?.label}
              </span>

              <span
                className={`text-[9px] md:text-xs px-1 py-0.5 md:px-2 md:py-0.5 rounded-full font-medium ${getCategoryColor(task.category)}`}
              >
                {getCategoryName(task.category)}
              </span>

              {task.dueDate && (
                <span
                  className={`text-[9px] md:text-xs flex items-center gap-0.5 md:gap-1 ${isOverdue(task.dueDate) && !task.isCompleted ? "text-red-500" : "text-secondary-400"}`}
                >
                  <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
