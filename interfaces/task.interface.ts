export interface ITask {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  uid: string;
  expiresAt: number;
  status: TaskStatus;
  priority: TaskPriority;
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
