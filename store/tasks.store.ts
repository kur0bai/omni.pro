import { create } from "zustand";
import { ITask, TaskModalMode } from "@/interfaces/task.interface";

interface TaskState {
  tasks: ITask[];
  filteredTasks: ITask[];
  selectedTask: ITask | null;
  isLoading: boolean;
  priorityFilter: string;
  statusFilter: string;
  mode: TaskModalMode;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setTasks: (tasks: ITask[]) => void;
  setFilteredTasks: (tasks: ITask[]) => void;
  setSelectedTask: (task: ITask | null) => void;
  setIsLoading: (loading: boolean) => void;
  setPriorityFilter: (priority: string) => void;
  setStatusFilter: (status: string) => void;
  clearSelectedTask: () => void;
  setMode: (mode: TaskModalMode) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filteredTasks: [],
  selectedTask: null,
  isLoading: false,
  priorityFilter: "all",
  statusFilter: "all",
  setTasks: (tasks) => set({ tasks }),
  setFilteredTasks: (tasks) => set({ filteredTasks: tasks }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  clearSelectedTask: () => set({ selectedTask: null }),
  mode: TaskModalMode.CREATE,
  setMode: (mode) => set({ mode }),
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
}));
