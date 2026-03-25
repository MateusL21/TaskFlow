import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { createNewTask } from "../utils/constants";

// Tipos de ações
const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  REORDER_TASKS: "REORDER_TASKS",
  SET_TASKS: "SET_TASKS",
};

// Reducer para gerenciar as tarefas
function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return action.payload;

    case ACTIONS.ADD_TASK:
      return [action.payload, ...state];

    case ACTIONS.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case ACTIONS.TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task,
      );

    case ACTIONS.UPDATE_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task,
      );

    case ACTIONS.REORDER_TASKS:
      return action.payload;

    default:
      return state;
  }
}

// Criar o contexto
const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("taskflow_tasks", []);

  // Função que aplica a ação e atualiza o estado
  const dispatch = (action) => {
    const newTasks = tasksReducer(tasks, action);
    setTasks(newTasks);
  };

  // Funções disponíveis para os componentes
  const addTask = (title, description, priority, category, dueDate) => {
    const newTask = createNewTask(
      title,
      description,
      priority,
      category,
      dueDate,
    );
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: taskId });
  };

  const updateTask = (taskId, updates) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id: taskId, updates } });
  };

  const reorderTasks = (newOrder) => {
    dispatch({ type: ACTIONS.REORDER_TASKS, payload: newOrder });
  };

  const value = {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    reorderTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Hook customizado para usar o contexto
// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
