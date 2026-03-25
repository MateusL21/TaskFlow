// src/utils/constants.js
export const PRIORITIES = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const DEFAULT_CATEGORIES = [
  { id: "work", name: "Trabalho", color: "blue" },
  { id: "personal", name: "Pessoal", color: "green" },
  { id: "study", name: "Estudos", color: "purple" },
  { id: "shopping", name: "Compras", color: "orange" },
  { id: "health", name: "Saúde", color: "red" },
];

export const PRIORITY_OPTIONS = [
  { value: PRIORITIES.HIGH, label: "Alta", color: "text-red-600 bg-red-50" },
  {
    value: PRIORITIES.MEDIUM,
    label: "Média",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    value: PRIORITIES.LOW,
    label: "Baixa",
    color: "text-green-600 bg-green-50",
  },
];

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 6);
};

export const createNewTask = (
  title,
  description,
  priority,
  category,
  dueDate,
) => ({
  id: generateId(),
  title: title.trim(),
  description: description.trim() || "",
  isCompleted: false,
  priority,
  category,
  dueDate: dueDate || null,
  createdAt: new Date().toISOString(),
  order: Date.now(),
});
