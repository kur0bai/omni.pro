export interface ITask {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  uid: string;
  dueDate: number;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
}

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskModalMode {
  CREATE = "create",
  EDIT = "edit",
}
